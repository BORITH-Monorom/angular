import { Component } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-component-b',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.css'
})
export class ComponentBComponent {
  todos: {id: number;task: string;completed: boolean;}[]=[];
constructor(private todoService: StateService){
  this.todoService.todo$.subscribe(todos => this.todos = todos)
}
  toggleCompleted(id: number) {
    this.todoService.toggleTodoCompletion(id)
  }
}
