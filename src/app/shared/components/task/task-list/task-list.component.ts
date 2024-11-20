import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { MaterialModule } from '../../../../module/material.module';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { removeTask } from '../../../../core/store/actions/task.actions';

@Component({
    selector: 'app-task-list',
    imports: [MaterialModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<string[]> | undefined
constructor(private store: Store<{tasks: string[]}>){}
  ngOnInit() {
    this.tasks$ = this.store.select('tasks');
  }
  removeTask(index:number){
    this.store.dispatch(removeTask({index}))
  }
}
