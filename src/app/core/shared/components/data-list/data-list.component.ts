import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { increment } from '../../../store/actions/counter.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-data-list',
    imports: [CommonModule],
    templateUrl: './data-list.component.html',
    styleUrl: './data-list.component.css'
})
export class DataListComponent {
count$: Observable<number> | undefined;
constructor(private store: Store<{count: number}>){}
ngOnInit(){}

increment(){
this.store.dispatch(increment());
}
}
