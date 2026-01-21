import { Component, Injector, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Maskmail } from '../../../../core/models/maskmail.model';
import { lastValueFrom, Observable } from 'rxjs';
import { MaterialModule } from '../../../../module/material.module';
import { DeleteMaskmail, GetMaskmails, MaskmailState, SetSelectedMaskmail } from '../../../../core/store/state/maskmail.state';
import { TruncateTextPipe } from "../../../../_utils/pipes/truncate-text.pipe";
import { isLoading, isPreview } from '../../../../core/store/signal/maskmail.store';

@Component({
    selector: 'app-maskmail-table',
    imports: [MaterialModule, TruncateTextPipe],
    templateUrl: './maskmail-table.component.html',
    styleUrl: './maskmail-table.component.scss'
})
export class MaskmailTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'banner','description', 'footer' ,'Action'];
maskmails:any;
  @Select(MaskmailState.getSelectedMaskmail)
  selectedMaskmail$!: Observable<Maskmail>;

constructor(private store:Store){}
  ngOnInit(): void {
    this.store.dispatch(new GetMaskmails())
    this.store.select(MaskmailState.getMaskmails).subscribe(res => {this.maskmails = res})

}
async onDelete(id:string){
  isLoading.set(true)
 await lastValueFrom(this.store.dispatch(new DeleteMaskmail(id)))
  isLoading.set(false)
  isPreview.set(false)
}

  onSelect(maskmail: Maskmail): void {
    // Dispatch the new SetSelectedMaskmail action with the selected item
    this.store.dispatch(new SetSelectedMaskmail(maskmail));
  }
}
