import { Component } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { TaskService } from '../../../../core/services/task.service';
import { Store } from '@ngrx/store';
import { addTask } from '../../../../core/store/actions/task.actions';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  constructor(private store: Store<{tasks: string[]}>){}
task: string = '';
addTask(){
  this.store.dispatch(addTask({task: this.task}))
  this.task = '';
}
}
