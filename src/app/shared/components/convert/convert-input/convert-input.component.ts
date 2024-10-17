import { Component } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { Store } from '@ngrx/store';
import { convertToKg } from '../../../../core/store/actions/convert.actions';

@Component({
  selector: 'app-convert-input',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './convert-input.component.html',
  styleUrl: './convert-input.component.scss'
})
export class ConvertInputComponent {
constructor(private store: Store<{lb:number,kg:number}>){}
lb:number= 0;
convert(){
this.store.dispatch(convertToKg({lb:this.lb}))
}
}
