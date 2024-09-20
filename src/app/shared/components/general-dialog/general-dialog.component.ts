import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { DialogData } from '../../../core/models/DialogData';
@Component({
  selector: 'app-general-dialog',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatDialogClose,MatDialogContent,FormsModule,MatFormField],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './general-dialog.component.html',
  styleUrl: './general-dialog.component.scss'
})
export class GeneralDialogComponent {
readonly dialogRef = inject(MatDialogRef<GeneralDialogComponent>)
readonly data = inject<DialogData>(MAT_DIALOG_DATA);
save(){

}
close(){
  
}
}
