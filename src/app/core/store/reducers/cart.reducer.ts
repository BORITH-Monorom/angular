import{Action, createReducer, on} from '@ngrx/store';
import {addItem, decrementCart, incrementCart, removeItem} from '../actions/cart.actions';

export interface CartState{
  items: string[];
  count: number; //New state to track the number of items
}
export const initialState:CartState = {
  items:[],
  count: 0, // Initially, the cart count is 0
};

const _cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) =>({
    ...state,
    items: [...state.items, item],
  })),
  on(removeItem, (state, { index}) => ({
    ...state,
    items: state.items.filter((_, i) => i !== index),
  })),

  //Handling the increment action
  on(incrementCart,(state)=>({
    ...state,
    count: state.count + 1, //Increment the cart count
  })),
  //handling the decrement action
  on(decrementCart,(state)=>({
    ...state,
    count: state.count - 1, //Decrement the cart count
  }))
);


export function cartReducer(state: CartState | undefined, action: Action<string>){
  return _cartReducer(state, action);
}
