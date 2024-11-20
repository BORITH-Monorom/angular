import { Component, Inject, inject, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { MaskmailPreviewComponent } from "../maskmail-preview/maskmail-preview.component";
import { MaskmailTableComponent } from "../maskmail-table/maskmail-table.component";
import { Store } from '@ngxs/store';
import { AddMaskmail, GetMaskmails } from '../../../../core/store/actions/maskmail.actions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedService } from '../../../../core/services/share.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../../general-dialog/general-dialog.component';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { ViewFooterComponent } from './view-footer/view-footer.component';

@Component({
    selector: 'app-maskmail-form',
    imports: [MaterialModule, MaskmailPreviewComponent, MaskmailTableComponent],
    templateUrl: './maskmail-form.component.html',
    styleUrl: './maskmail-form.component.scss'
})
export class MaskmailFormComponent implements OnInit {
value: any;
constructor(

  private store: Store,
  public sharedService: SharedService,
 ){
}
readonly dialog = inject(MatDialog);
banner: string = 'https://maskmail.itlink.com.kh/files/5f967fc8702ad/HRINC%20%28Top%20Hiring%29%20%283%29.webp';
description: string = '';
footer: string = 'https://maskmail.itlink.com.kh/files/5f967fc8702ad/Email%20footer-01.webp';

updateSelectedValue(newValue: string){
this.sharedService.updateSelectedValue(newValue);
}
ngOnInit(): void {
this.store.dispatch(new GetMaskmails());
}
submit() {
    this.store.dispatch(new AddMaskmail({
      banner: this.banner,
      description: this.description,
      footer: this.footer}));
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
