import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeleteMaskmail, GetMaskmails } from '../../../../core/store/actions/maskmail.actions';
import { Maskmail } from '../../../../core/models/maskmail.model';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../../module/material.module';
import { MaskmailState } from '../../../../core/store/state/maskmail.state';
import { TruncateTextPipe } from "../../../../_utils/pipes/truncate-text.pipe";

@Component({
    selector: 'app-maskmail-table',
    imports: [MaterialModule, TruncateTextPipe],
    templateUrl: './maskmail-table.component.html',
    styleUrl: './maskmail-table.component.scss'
})
export class MaskmailTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'banner','description', 'footer' ,'Action'];
maskmails:any;
constructor(private store:Store){}
  ngOnInit(): void {
    this.store.select(MaskmailState.getMaskmails).subscribe(res => {this.maskmails = res})

}
onDelete(id:string):void{
this.store.dispatch(new DeleteMaskmail(id));
}
}
