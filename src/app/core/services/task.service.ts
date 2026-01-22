import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {
    effect(() =>{
      console.log('Tasks chaned:', this.todos())
      console.log('computed:', this.todoCount())
    })
  }


  todos = signal<string[]>(["Learn sinal","build AI Todo"])
  
  todoCount = computed(() => this.todos().length)
  addTodo(todoText:string){
    this.todos.update(currentTodos => [...currentTodos, todoText])
    console.log(this.todos,"Todos")
  }

  removeTodo(index:number){
    this.todos.update(currentTodos =>
      currentTodos.filter((_,i)=> i !== index)
    )
  }
}
