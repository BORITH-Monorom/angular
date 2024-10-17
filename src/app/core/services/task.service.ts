import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = [];
  constructor() { }

  addTask(task: string) {
    this.tasks.push(task);
  }
  getTasks(){
    return this.tasks;
  }
  removeTask(index: number){
    this.tasks.splice(index, 1);
  }
}
