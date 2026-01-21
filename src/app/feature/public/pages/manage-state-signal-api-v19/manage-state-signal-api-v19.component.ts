import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { counterService } from '../../../../core/services/counter.service';

@Component({
  selector: 'app-manage-state-signal-api-v19',
  imports: [MatIconModule,MatButtonModule,RouterLink,CommonModule],
  templateUrl: './manage-state-signal-api-v19.component.html',
  styleUrl: './manage-state-signal-api-v19.component.scss'
})
export class ManageStateSignalApiV19Component {
counterService = inject(counterService)
// _________________________Content 1__________________________
// _________________________Card 1_____________________________
SingleInput = "Single Input With Linked Signal"
yearOld = signal<string>('23');
displayAge = linkedSignal(this.yearOld);
UpdateAge(event:Event){
  const input = event.target as HTMLInputElement;
  this.yearOld.set(input.value);
}





// __________________________Card 2_________________________
MultipleInput = "Multiple Input with Compute"
firstName = signal<string>('');
lastName = signal<string>('');
DisplayName = computed(() => {
  const first = this.firstName();
  const last = this.lastName();
  return `${first} ${last}`.trim(); // trim() Avoid Extra space if empty
})
UpdateFirstName(event:Event){
  const input = event.target as HTMLInputElement;
  this.firstName.set(input.value);
}
UpdateLastName(event:Event){
  const input = event.target as HTMLInputElement;
  this.lastName.set(input.value);
}




// _________________________Card 3__________________________

counter = signal<number>(0);
DisplayCounter_linkedSignal = linkedSignal(() => {
 return this.counter() + ' Time Click'
});
DisplayCounter_computed = computed(() => this.counter() + ' Time click');
add(){
this.counter.set(this.counter() + 1)
}
remove(){
this.counter.set(this.counter() - 1)
}



// _________________________Card 4__________________________
injectSignal="manage global state using signals inside services:"
increment(){
this.counterService.increment();
}

decrement(){
this.counterService.decrement();
}



// _________________________Content 2__________________________
// _________________________Card 1__________________________
public counter_c2_r1 = signal<number>(0)
incre(){
this.counter_c2_r1.set(this.counter_c2_r1() + 1)
}



// _________________________Card 2__________________________
private counterSubject = new BehaviorSubject<number>(0)
public counter$ = this.counterSubject.asObservable();

observable_incre(){
  this.counterSubject.next(this.counterSubject.value + 1);
}
}
