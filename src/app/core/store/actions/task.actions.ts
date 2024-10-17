import {createAction, props} from '@ngrx/store';

export const addTask = createAction('[Task] Add Task', props<{ task: string}>());
export const removeTask = createAction('[Task] Remove Task', props<{ index: number}>());

