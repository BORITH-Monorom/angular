import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Todo{
  id: number;
  task: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todo$ = this.todosSubject.asObservable();
  private currentId = 0;

  addTodo(task: string){
    const newTodo: Todo = { id: this.currentId++, task, completed: false};
    this.todosSubject.next([...this.todosSubject.value, newTodo]);
  }

  toggleTodoCompletion(id: number){
    const updatedTodos = this.todosSubject.value.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    this.todosSubject.next(updatedTodos);
  }
}
