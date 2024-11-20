import { Component } from '@angular/core';
import { MaterialModule } from '../../../../module/material.module';
import { Store } from '@ngrx/store';
import { addItem, incrementCart } from '../../../../core/store/actions/cart.actions';

@Component({
    selector: 'app-product-list',
    imports: [MaterialModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
constructor(private store: Store<{ cart: { items: string[], count: number } }>) {}
products = ['Product 1', 'Product 2', 'Prodcut 3'];
addToCart(product: string) {
  this.store.dispatch(addItem({item: product}));
  this.store.dispatch(incrementCart())
}
}
