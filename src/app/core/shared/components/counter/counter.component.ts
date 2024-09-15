import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
reset() {
throw new Error('Method not implemented.');
}
counts: any;
increment() {
throw new Error('Method not implemented.');
}
decrement() {
throw new Error('Method not implemented.');
}

}
