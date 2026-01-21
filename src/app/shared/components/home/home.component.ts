import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { TaskInputComponent } from "../task/task-input/task-input.component";
import { TaskListComponent } from "../task/task-list/task-list.component";
import { CartComponent } from "../cart/cart/cart.component";
import { ProductListComponent } from "../cart/product-list/product-list.component";
import { Observable } from 'rxjs';
import { ConvertInputComponent } from "../convert/convert-input/convert-input.component";
import { ConvertResultComponent } from "../convert/convert-result/convert-result.component";
import { BannerComponent } from "../banner/banner.component";
import { GetSlides } from '../../../core/store/state/slide.state';
import { Store } from '@ngxs/store';
// import { GetSlides } from '../../../core/store/state/slide.state';
@Component({
    selector: 'app-home',
    imports: [MaterialModule, TaskInputComponent, TaskListComponent, CartComponent, ProductListComponent, ConvertInputComponent, ConvertResultComponent, BannerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private store: Store){}
  increment$: Observable<number> | undefined
  ngOnInit(): void {
    this.store.dispatch(new GetSlides());
    this.increment$ = this.store.select(state => state.cart.count)


  }

}
