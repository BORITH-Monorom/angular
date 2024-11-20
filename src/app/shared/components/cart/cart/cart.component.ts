import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { MaterialModule } from '../../../../module/material.module';
import { Store } from '@ngrx/store';
import { decrementCart, removeItem } from '../../../../core/store/actions/cart.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cart',
    imports: [MaterialModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
constructor(private store:Store<{cart:{items: string[]}}>){}
carts$: Observable<string[]> | undefined
  ngOnInit(): void {
    this.carts$ = this.store.select(state => state.cart.items)
  }
  removeCart(i: number){
    this.store.dispatch(removeItem({index: i}))
    this.store.dispatch(decrementCart())
  }

}
