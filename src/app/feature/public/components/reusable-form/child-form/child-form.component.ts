import { Component, inject, Input, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-child-form',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  viewProviders: [
    {
    provide: ControlContainer,
    useFactory:() => inject(ControlContainer, {skipSelf: true})
  }
],
  // templateUrl: './child-form.component.html',
  template: `
  <span>{{label}}</span>
  <div class="grid grid-cols-2 gap-5" [formGroupName]="controlKey">
    <mat-form-field>
      <mat-label>Street</mat-label>
      <input matInput formControlName="street">
    </mat-form-field>

    <mat-form-field>
      <mat-label>Zip code</mat-label>
      <input matInput formControlName="zipCode">
    </mat-form-field>
  </div>



  `,
  styleUrl: './child-form.component.scss'
})
export class ChildFormComponent implements OnInit, OnDestroy{

@Input({required:true}) controlKey = '';
@Input() label = '';

parentContainer = inject(ControlContainer);

get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
}
ngOnInit(): void {
  this.parentFormGroup.addControl(this.controlKey,
    new FormGroup({
      zipCode: new FormControl(''),
      street: new FormControl('')
    })

  )
}

ngOnDestroy(): void {
  this.parentFormGroup.removeControl(this.controlKey)
}
}
