import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { Country } from '../../models/signal.model';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TodosStore } from '../../../store/todo.store';
import {MatListModule} from '@angular/material/list';
import { AddTodo, DeleteTodo, GetTodos, TodoState, UpdateTodo } from '../../../store/state/todo.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../../module/material.module';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [

    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TriStateCheckboxModule,
    TreeModule,
    CheckboxModule,
    TreeSelectModule,
    DropdownModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  constructor(private store: Store) {}
  newTodoTitle: string = '';
  todos$ = this.store.select(TodoState.getTodoList);
  ngOnInit(): void {
    this.store.dispatch(new GetTodos());
  }

  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>; // Reference to the input element

  @HostListener('window:keydown',['$event']) // Listen for keydown events
  handleKeyboardEvent(event: KeyboardEvent){// Handle the keydown event
    if(event.ctrlKey && event.key === 'k'){
      event.preventDefault(); // Prevent the default behavior of the keydown event
      this.focusInput(); // Focus the input
    }
  }

  focusInput(){
  this.todoInput.nativeElement.focus(); // Focus the input
  }



addTodo(){
  this.store.dispatch(new AddTodo({title: this.newTodoTitle}));
  this.newTodoTitle = '';
}


  // Update a todo (mark as complete)
  updateTodo(todo: { _id: string; title: string; completed: boolean }) {
    this.store.dispatch(new UpdateTodo({
      _id: todo._id,
      title: todo.title,
      completed: !todo.completed
    }));
  }


  deleteTodo(id: any){
    this.store.dispatch(new DeleteTodo(id))
  }

//   checked: boolean = false;

//   dropdown: boolean = true;
//   favorite: boolean = true;
//   selected:any;


//   fav_completed: boolean = true;
//   checkbox_completed: boolean = false;
//   newTodoDescription: string = '';

// constructor(private messageService: MessageService,){}
//   ngOnInit() {

//   }
//   complete() {
//     this.dropdown = !this.dropdown;
//   }
//   on_fav() {
//     this.favorite = !this.favorite;
//   }
//   on_fav_completed() {
//     this.fav_completed = !this.fav_completed;
//   }


}
