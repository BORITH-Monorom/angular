import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-convert-result',
  standalone: true,
  imports: [MaterialModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './convert-result.component.html',
  styleUrl: './convert-result.component.scss'
})
export class ConvertResultComponent implements OnInit{
kg$: Observable<number> | undefined
constructor(private store: Store<{convert: {kg:number}}>){}

ngOnInit(): void {
  this.kg$ = this.store.select(state => state.convert.kg)
}
}
