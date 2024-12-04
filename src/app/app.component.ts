
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Provider, } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TodosStore } from './core/store/todo.store';
import { JsonPipe } from '@angular/common';
import { ApiService } from './core/services/api.service';
import { sweetAlert2 } from './core/services/sweetalert.utils';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AuthGuard } from './core/services/auth.guard';

export const JWT_OPTIONS_PROVIDER: Provider = {
  provide: JWT_OPTIONS,
  useValue: { /* your JWT options here */ }
};
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        NavbarComponent,
    ],
    providers: [ApiService, sweetAlert2, AuthService, AuthGuard, JwtHelperService, JWT_OPTIONS_PROVIDER, JwtHelperService]
})
export class AppComponent {

store = inject(TodosStore);

ngOnInit(){
  // this.loadTodos().then(() => console.log("todo loaded"));
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
