import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-component-a',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.css'
})
export class ComponentAComponent {

  todos: {id: number;task: string;completed: boolean;}[]=[];
  newTask: string = '';
  constructor(private todoService: StateService) {
    this.todoService.todo$.subscribe(todos => this.todos = todos);
  }

  addTodo(){
    if(this.newTask){
      this.todoService.addTodo(this.newTask)
      this.newTask = '';
    }
  }
  }

