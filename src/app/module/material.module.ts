import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
// import {NgxLoadingModule } from 'ngx-loading';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [],
  // imports: [
  //   NgxLoadingModule.forRoot({})
  // ],
  exports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    MatListModule,
    // NgxLoadingModule
  ]
})
export class MaterialModule { }
