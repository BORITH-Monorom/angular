import { Component, Inject, inject, Injector, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { MaskmailPreviewComponent } from "../maskmail-preview/maskmail-preview.component";
import { MaskmailTableComponent } from "../maskmail-table/maskmail-table.component";
import { Store } from '@ngxs/store';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedService } from '../../../../core/services/share.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../../general-dialog/general-dialog.component';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { ViewFooterComponent } from './view-footer/view-footer.component';
import { isLoading, isPreview } from '../../../../core/store/signal/maskmail.store';
import { async, lastValueFrom } from 'rxjs';
import { AddMaskmail, GetMaskmails } from '../../../../core/store/state/maskmail.state';

@Component({
    selector: 'app-maskmail-form',
    imports: [MaterialModule, MaskmailPreviewComponent, MaskmailTableComponent],
    templateUrl: './maskmail-form.component.html',
    styleUrl: './maskmail-form.component.scss'
})
export class MaskmailFormComponent implements OnInit {
@ViewChild(MaskmailPreviewComponent) previewComponent!: MaskmailPreviewComponent
exportAsHTML(){this.previewComponent.exportAsHTML()}
value: any;
selectedType:string = 'rec'
constructor(
  private store: Store,
  public sharedService: SharedService,
  // public MaskmailPreviewComponent: MaskmailPreviewComponent
 ){
  this.sharedService.updateSelectedValue(this.selectedType)
}
private MaskmailPreviewComponent = viewChild(MaskmailPreviewComponent)
readonly dialog = inject(MatDialog);
banner: string = 'https://maskmail.itlink.com.kh/files/5f967fc8702ad/HRINC%20%28Top%20Hiring%29%20%283%29.webp';
description: string = '';
footer: string = 'https://maskmail.itlink.com.kh/files/5f967fc8702ad/download.png';

updateSelectedValue(newValue: string){
  this.selectedType = newValue;
this.sharedService.updateSelectedValue(newValue);
}
ngOnInit(): void {
this.store.dispatch(new GetMaskmails());
}
public isLoading(){
  return isLoading()
}
async submit() {
    isLoading.set(true)
   await lastValueFrom(this.store.dispatch(new AddMaskmail({
      banner: this.banner,
      description: this.description,
      footer: this.footer})))
      isLoading.set(false)
}
handleFileInput(event:any){
  const file = event.target.files[0];// Get the file
  console.log(file, "file")
  if(file){
    const reader = new FileReader();
    reader.onload = (e: any) =>{
     this.description = e.target.result; //set the file content to description
    };
    reader.readAsText(file); //Readd the file as text
  }
}
exportAsHtml(){
  this.MaskmailPreviewComponent()?.exportAsHTML()
}

openBannerDialog(){
  const dialogRef= this.dialog.open(GeneralDialogComponent, {
    width: "1000px",
    data:{
      title: "Add Banner",
      save: "Add Banner",
      close: "Cancel",
      component: ViewBannerComponent,
    },
    disableClose: false,
  }
    )
    dialogRef.afterClosed().subscribe((selectedBannerUrl: string)=>{
      if(selectedBannerUrl){
        this.banner = selectedBannerUrl;
      }
    })
  }


  openFooterDialog(){
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: "1000px",
      data:{
        title: "Add Footer",
        save: "Add",
        close: "Close",
        component: ViewFooterComponent,
      },
      disableClose: false,
    }
  )
}



};
