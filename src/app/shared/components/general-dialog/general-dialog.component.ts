import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { DialogData } from '../../../core/models/DialogData';
import { MaterialModule } from '../../../module/material.module';
@Component({
    selector: 'app-general-dialog',
    imports: [MatDialogModule, MatDialogTitle, MatDialogClose, MatDialogContent, FormsModule, MatFormField, MaterialModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './general-dialog.component.html',
    styleUrl: './general-dialog.component.scss'
})
export class GeneralDialogComponent implements AfterViewInit {

readonly dialogRef = inject(MatDialogRef<GeneralDialogComponent>)
readonly data = inject<DialogData>(MAT_DIALOG_DATA);
@ViewChild('target', { read: ViewContainerRef }) target!: ViewContainerRef;

  ngAfterViewInit(): void {
    if(this.data.component){
      this.loadComponent(this.data.component);
    }
  }
  loadComponent(component: Type<any>){
    this.target.clear();
    this.target.createComponent(component);
  }
save(){

}
close(){

}
}
