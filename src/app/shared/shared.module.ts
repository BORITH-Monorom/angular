import { HttpClientModule } from "@angular/common/http";
import { ComponentAComponent } from "../core/shared/components/component-a/component-a.component";
import { ComponentBComponent } from "../core/shared/components/component-b/component-b.component";
import { CounterComponent } from "../core/shared/components/counter/counter.component";
import { DataListComponent } from "../core/shared/components/data-list/data-list.component";
import { ObservableComponent } from "../core/shared/components/observable/observable.component";
import { TodoListComponent } from "../core/shared/components/todo-list/todo-list.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
@NgModule({
imports: [
  ProductListComponent,
  ComponentAComponent,
  ComponentBComponent,
  TodoListComponent,
  CounterComponent,
  DataListComponent,
  ObservableComponent,
  CategoryListComponent,
  HttpClientModule,
  MatFormFieldModule,
  MatInputModule

],
exports: [
  ProductListComponent,
  ComponentAComponent,
  ComponentBComponent,
  TodoListComponent,
  CounterComponent,
  DataListComponent,
  ObservableComponent,
  CategoryListComponent,
  HttpClientModule,
  MatFormFieldModule,
  MatInputModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class sharedModules{}
