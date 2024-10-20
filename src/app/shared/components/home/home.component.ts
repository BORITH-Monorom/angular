import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { TaskInputComponent } from "../task/task-input/task-input.component";
import { TaskListComponent } from "../task/task-list/task-list.component";
import { CartComponent } from "../cart/cart/cart.component";
import { ProductListComponent } from "../cart/product-list/product-list.component";
import { CartState } from '../../../core/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { incrementCart } from '../../../core/store/actions/cart.actions';
import { Observable } from 'rxjs';
import { ConvertInputComponent } from "../convert/convert-input/convert-input.component";
import { ConvertResultComponent } from "../convert/convert-result/convert-result.component";
import { BannerComponent } from "../banner/banner.component";
import { BannerTableComponent } from "../../../feature/admin/banner-table/banner-table.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, TaskInputComponent, TaskListComponent, CartComponent, ProductListComponent, ConvertInputComponent, ConvertResultComponent, BannerComponent, BannerTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private store: Store<{ cart: { items: string[], count: number } }>){}
  increment$: Observable<number> | undefined
  ngOnInit(): void {
    this.increment$ = this.store.select(state => state.cart.count)
  }

}
