import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChildFormComponent } from "./child-form/child-form.component";
import { MatButtonModule } from '@angular/material/button';

import { FormArrayComponent } from "./form-array/form-array.component";
import { ApiServiceService } from '../../../../core/services/api-service.service';

@Component({
  selector: 'app-reusable-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ChildFormComponent, MatButtonModule, FormArrayComponent],
  // templateUrl: './reusable-form.component.html',
  template: `

<div class="container mt-5">
<form [formGroup]="parentForm" (ngSubmit)="submit()">

  <div class="content">
    <div class="content__header">
      <span class="content__title">
        Reusable Form
      </span>
    </div>
    <div class="content__body grid grid-cols-2 gap-5">
      <mat-form-field>
        <mat-label>DisplayName</mat-label>
        <input matInput formControlName="DisplayName">
      </mat-form-field>
    </div>
    <div class="grid grid-cols-1">
      <app-child-form label="Address" controlKey="address"></app-child-form>
      <app-child-form label="Bill" controlKey="bill"></app-child-form>
    </div>



    <app-form-array formArrayName="users"></app-form-array>



    <div class="content__footer">
        <button mat-flat-button>Submit</button>
    </div>
  </div>
  {{display()}}

</form>
</div>

  `,
  styleUrl: './reusable-form.component.scss'
})
export class ReusableFormComponent {
  api = inject(ApiServiceService)

parentForm: FormGroup;
display = signal("")

constructor(private fb: FormBuilder) {
this.parentForm = this.fb.group({
  DisplayName: new FormControl(''),
  users: this.fb.array([
    this.fb.group({ name: '', age: '' }),
    this.fb.group({ name: '', age: '' })
  ])
});


        // Subscribe to valueChanges for real-time display
    this.parentForm.valueChanges.subscribe(val => {
      this.display.set(JSON.stringify(val, null, 2));
    });
  }

submit(){
  this.api.addForm(this.parentForm.value).subscribe((res) => {
    console.log(res);
    this.display.set(res)
    this.parentForm.reset();
  })

}

}
