import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  private cartItems: string[] = [];

  getItem(){
    return this.cartItems;
  }
  addItem(item: string){
    this.cartItems.push(item);
  }
  removeItem(index:number){
    this.cartItems.splice(index, 1);
  }
}
