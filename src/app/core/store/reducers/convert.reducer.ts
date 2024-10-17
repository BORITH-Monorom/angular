import { Action, createReducer, on } from "@ngrx/store";
import { convertToKg } from "../actions/convert.actions";

export interface convertState{
  lb:number;
  kg:number;
}

export const initialState: convertState = {
  lb: 0,
  kg: 0,
};

const _convertReducer = createReducer(
  initialState,
  on(convertToKg, (state,{lb}) =>({
    ...state,
    lb,
    kg: lb * 0.453592 //Convert lb to kg
  }))
)

export function convertReducer(state: convertState | undefined,action: Action<string>){
  return _convertReducer(state,action);
}
