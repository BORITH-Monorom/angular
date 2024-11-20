import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/signal.model';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TodosStore } from '../../../store/todo.store';
import {MatListModule} from '@angular/material/list';
import { AddTodo, DeleteTodo, GetTodos, TodoState, UpdateTodo } from '../../../store/state/todo.state';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { MaterialModule } from '../../../../module/material.module';
import { Todo } from '../../../models/todo.model';
import { UtilsService } from '../../../services/utils.service';
import { sweetAlert2 } from '../../../services/sweetalert.utils';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  panelOpenState: boolean = false;
  private intervalId: any; //Store interval Id to clear on destroy
  ellapsedTimes: {[key: string]: string} = {}; //Store elapsed times
  constructor(private store: Store,
    public utils: UtilsService,
    private SweetAlert2: sweetAlert2

  ) {}
  newTodoTitle: string = '';
  todos$ = this.store.select(TodoState.getTodoList);
  ngOnInit(): void {
    this.store.dispatch(new GetTodos());

    this.isHistoryDisabled.subscribe(disabled => {
      if (disabled) {
        this.panelOpenState = false; // Set `panelOpenState` to false if disabled
      }
    });

    //Setup interval to update elapsed times every second
    this.intervalId = setInterval(() =>{
      this.updateElapsedTimes();
    }, 1000);
  }
  ngOnDestroy(): void{
    clearInterval(this.intervalId); // Clear interval on component destroy to prevent memory leaks
  }

  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>; // Reference to the input element
  @ViewChild('truncate') truncate!: ElementRef;
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
  if(this.newTodoTitle.trim()){ // Check if the newTodoTitle is not empty
    this.store.dispatch(new AddTodo({title: this.newTodoTitle}))
    .subscribe({
    next: () =>{
      this.SweetAlert2.showToastSuccess('Todo added successfully');
      this.newTodoTitle = '';
    },
    error:() =>{
      this.SweetAlert2.showToastError('Failed to add todo');
    }
  });
}else{
  this.SweetAlert2.showErrorAlert('Please enter a valid todo');
}
}


  // Update a todo (mark as complete)
  updateTodo(todo: { _id: string; title: string; completed: boolean }) {
    this.store.dispatch(new UpdateTodo({
      _id: todo._id,
      title: todo.title,
      completed: !todo.completed
    }));
  }
  renameTodo(todo:any){
   this.SweetAlert2.showInputConfirmationDialog(
    'Rename Todo',
    'Enter new title',
    'Rename',
    todo.title // pass the title here
  ).then((result) => {
     if (result.isConfirmed) {
       this.store.dispatch(new UpdateTodo({
         _id: todo._id,
         title: result.value,
         completed: todo.completed,
       }))
     }
   })
  }


  deleteTodo(id: any){
    this.SweetAlert2.showToastSuccess('Todo deleted successfully');
    this.store.dispatch(new DeleteTodo(id))
  }


  //Check if all todos are completed
  get isHistoryDisabled(): Observable<boolean> {
    return this.todos$.pipe(
      map(todos => {
        console.log('todos in isHistoryDisabled', todos);
        const result = todos.every(todo => todo.completed === false); // Check if at least one is completed
        console.log('isHistoryDisabled result', result);
        return result; // Disable if at least one is completed
      })
    );
  }

  //Check if the text is truncated
  isTruncated(element: HTMLElement):boolean{
    return element.scrollWidth > element.clientWidth;
  }

  //Method update elapsed times for all todos
  private updateElapsedTimes():void{
    this.todos$.subscribe(todos =>{
      todos.forEach(todo =>{
        this.ellapsedTimes[todo._id] = this.utils.nowDate(todo.createAt)
      })
    }

    )
  }
}
