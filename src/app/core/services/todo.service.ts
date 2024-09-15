import { Injectable } from '@angular/core';
import { TODOS } from '../models/mock-data';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {}
  async getTodos(){
    await sleep(1000);
    return TODOS;
  }
  async addTodo(todo:Partial<Todo>): Promise<Todo>{
    await sleep(1000);
    return {
      id: Math.random().toString(36).substring(2,9),
      ...todo
    } as Todo
  }
}
async function sleep(ms:number){
  return new Promise(resolve =>
    setTimeout(resolve , ms));
}
