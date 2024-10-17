import {createAction, props} from '@ngrx/store';

export const addItem = createAction('[Cart] Add Item', props<{item: string}>());
export const removeItem = createAction('[Cart] Remove Item', props<{index: number}>());
export const incrementCart = createAction('[Cart] Increment Cart');
export const decrementCart = createAction('[Cart] Decrement Cart');
