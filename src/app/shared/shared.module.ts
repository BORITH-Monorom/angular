import { HttpClientModule } from "@angular/common/http";
import { ComponentAComponent } from "../core/shared/components/component-a/component-a.component";
import { ComponentBComponent } from "../core/shared/components/component-b/component-b.component";
import { CounterComponent } from "../core/shared/components/counter/counter.component";
import { DataListComponent } from "../core/shared/components/data-list/data-list.component";
import { ObservableComponent } from "../core/shared/components/observable/observable.component";
import { TodoListComponent } from "../core/shared/components/todo-list/todo-list.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
export const sharedModules = [
  //components
  ProductListComponent,
  ComponentAComponent,
  ComponentBComponent,
  TodoListComponent,
  CounterComponent,
  DataListComponent,
  ObservableComponent,
  // CategoryListComponent,

  //primeNG
  InputTextareaModule,
  FloatLabelModule,
  FormsModule,
  //common
  CommonModule
]

export const schemas =[
  CUSTOM_ELEMENTS_SCHEMA
]
