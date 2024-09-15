import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
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
    MatListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  store = inject(TodosStore)



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
