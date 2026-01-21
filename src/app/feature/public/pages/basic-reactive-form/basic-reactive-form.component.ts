import { Component, inject, Input, signal, Signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../../core/services/api-service.service';
import { toggleCodePreview } from '../../../../core/signal/store/code-preview.store';


@Component({
  selector: 'app-basic-reactive-form',
  imports: [CommonModule,MatIconModule,ReactiveFormsModule, MatButtonModule,MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './basic-reactive-form.component.html',
  styleUrl: './basic-reactive-form.component.scss'
})
export class BasicReactiveFormComponent {
  fb = inject(FormBuilder);
  api = inject(ApiServiceService)

  display1 = signal('');
  display2 = signal('');
  display3 = signal('');

  form1:FormGroup = this.fb.group({
    username: ['']
  });
  form2:FormGroup = this.fb.group({
    username: [''],
    phone: ['']
  });
  form3:FormGroup = this.fb.group({
    jobBenefits: this.fb.array([])
  });
  constructor(){

    this.form1.valueChanges.subscribe(val => {
      this.display1.set(JSON.stringify(val, null, 2));
    });
    this.form2.valueChanges.subscribe(val => {
      this.display2.set(JSON.stringify(val, null, 2));
    });
    this.form3.valueChanges.subscribe(val => {
      this.display3.set(JSON  .stringify(val, null, 2));
    });
  }

  form1Submit() {
    console.log(this.form1.value)
    this.form1.reset();
  }
  form2Submit() {
    console.log(this.form2.value)
    this.form2.reset();
  }

  form3Submit() {
    console.log(this.form3.value)
    this.form3.reset();
  }

benefitsList = [
  { name: 'Health Insurance' },
  { name: 'Annual Leave' },
  { name: 'Flexible Hours' },
  { name: 'Remote Work' },
];



onCheckboxChange(event: any, benefit: any) {
  const jobBenefits = this.form3.get('jobBenefits') as FormArray;
console.log(event.target.checked, "check")
  if (event.target.checked) {
    jobBenefits.push(this.fb.group({
      name: benefit.name,
      amount: "",
    }));
  } else {
   const index = jobBenefits.controls.findIndex(ctrl => {
  const result = ctrl.value.name === benefit.name;
  console.log(result, 'index');
  return result;
});
    if (index !== -1) {
      jobBenefits.removeAt(index);
    }
  }
}


  toggleCode(id:string){
    if(id === 'card1'){
      toggleCodePreview(id,this.htmlCode1,this.tsCode1)
    }else if(id === 'card2'){
      toggleCodePreview(id,this.htmlCode2, this.tsCode2)
    }else if(id === 'card3'){
      toggleCodePreview(id,this.htmlCode3, this.tsCode3)
    }
  }

htmlCode1 = `
<form action="" [formGroup]="parentForm">
  <mat-form-field class="w-full">
    <mat-label>Input</mat-label>
    input formControlName="username" matInput>
  </mat-form-field>
</form>

<button matButton="filled" (click)="onSubmit()">Submit</button>

`;

tsCode1 = `
fb = inject(FormBuilder);
form1: FormGroup;

constructor(){
  this.form1 = this.fb.group({
    username: ['']
  });
}

form1Submit() {
  console.log(this.form1.value)
  this.form1.reset();
}

`;

htmlCode2 = `
<form action="" [formGroup]="parentForm">
  <mat-form-field class="w-full">
    <mat-label>Input</mat-label>
    input formControlName="username" matInput>
  </mat-form-field>
</form>

<button matButton="filled" (click)="onSubmit()">Submit</button>
<button matButton="tonal" (click)="onClear()">Clear</button>

`;

tsCode2 = `
fb = inject(FormBuilder);
form1: FormGroup;

constructor(){
  this.form2 = this.fb.group({
    username: [''],
    phone: [''],
  });
}

form2Submit() {
  console.log(this.form2.value)
  this.form2.reset();
}
`;

htmlCode3 = `
<form [formGroup]="form3">
  <label *ngFor="let benefit of benefitsList">
    <input
      type="checkbox"
      (change)="onCheckboxChange($event, benefit)"/>
    {{ benefit.name }}
  </label>
</form>

`
tsCode3 = `
fb = inject(FormBuilder);

benefitsList = [
  { name: 'Health Insurance', value: 'health_insurance' },
  { name: 'Annual Leave', value: 'annual_leave' },
  { name: 'Flexible Hours', value: 'flexible_hours' },
  { name: 'Remote Work', value: 'remote_work' },
];

form3:FormGroup = this.fb.group({
  jobBenefits: this.fb.array([])
});

onCheckboxChange(event: any, benefit: any) {
  const jobBenefits = this.form3.get('jobBenefits') as FormArray;

  if (event.target.checked) {
    jobBenefits.push(this.fb.group({
      name: benefit.name,
      value: benefit.value
    }));
  } else {
    const index = jobBenefits.controls.findIndex(ctrl => ctrl.value.value === benefit.value);
    if (index !== -1) {
      jobBenefits.removeAt(index);
    }
  }
}


  form3Submit() {
    console.log(this.form3.value)
    this.form3.reset();
  }
`
}

