import { Component, effect } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { TaskService } from '../../../../core/services/task.service';
import { Store } from '@ngrx/store';
import { addTask } from '../../../../core/store/actions/task.actions';

@Component({
    selector: 'app-task-input',
    imports: [MaterialModule],
    templateUrl: './task-input.component.html',
    styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  constructor(private taskService: TaskService){}
todoText:string = ''
submit(){
  this.taskService.addTodo(this.todoText)
  this.todoText = ''
}


}
