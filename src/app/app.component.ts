
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MessageService } from 'primeng/api';
import { TodosStore } from './core/store/todo.store';
import { JsonPipe } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { sharedModules } from './shared/shared.module';
import { CategoryListComponent } from './shared/components/category-list/category-list.component';
import { ApiService } from './core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { sweetAlert2 } from './core/services/sweetalert.utils';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [sharedModules,CategoryListComponent,RouterOutlet,MatFormFieldModule,JsonPipe,MatProgressSpinnerModule],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers:[MessageService,ApiService,sweetAlert2]
})
export class AppComponent {

store = inject(TodosStore);

ngOnInit(){
  this.loadTodos().then(() => console.log("todo loaded"));
}

async loadTodos(){
  await this.store.loadAll();
}
  // title = 'angular_v18';
  // @ViewChild('myInput')
  // myInput!: ElementRef;
  // changeInput(){
  //   this.myInput.nativeElement.value = 'New value'
  // }
// store = inject(TodosStore)

// ngOnInit(){
//   this.LoadTodos().then(() => {
//     console.log("todos loaded")
//   });
// }
//   async LoadTodos(){
//     await this.store.loadAll();
//   }
}
