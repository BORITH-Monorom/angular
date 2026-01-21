import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  template: `
    <div [formArrayName]="formArrayName">
      @for (control of formArray.controls; track control; let i = $index) {
        <div [formGroupName]="i">
          <input type="text" formControlName="name" placeholder="Name">
          <input type="number" formControlName="age" placeholder="Age">
        </div>
      }
    </div>
    `,
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {
  @Input() formArrayName!: string;
  constructor(private controlContainer: ControlContainer) {}

  get formArray(): FormArray {
    const control = this.controlContainer.control?.get(this.formArrayName);
    if (!control) {
      throw new Error(`FormArray with name '${this.formArrayName}' not found in parent form group.`);
    }
    if (!(control instanceof FormArray)) {
      throw new Error(`Control '${this.formArrayName}' is not a FormArray.`);
    }
    return control as FormArray;
  }
}
