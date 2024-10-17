import { Action, createReducer, on } from '@ngrx/store';
import { addTask, removeTask } from '../actions/task.actions';


export const initialState: string[] = [];

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(removeTask, (state, { index }) => state.filter((_, i) => i !== index))
);

export function taskReducer(state: string[] | undefined, action: Action<string>) {
  return _taskReducer(state, action);
}
