import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";

export class GetTodos {
  static readonly type = '[Todos] Get Todos';
}

export class AddTodo{
  static readonly type = '[Todos] Add Todo';
  constructor(public payload: {title: string}){}
}

export class UpdateTodo{
  static readonly type = '[Todos] Update Todo';
  constructor(public payload: {_id: string, title: string, completed: boolean}){}
}

export class DeleteTodo{
  static readonly type = '[Todos] Delete Todo';
  constructor(public id: string){}
}

export interface TodoStateModel{
  todos: any[];
}

@State<TodoStateModel>({
name: 'todos',
defaults:{
  todos: []
}
})
@Injectable()
export class TodoState{
  constructor( private apiService: ApiService){}

  @Selector()
  static getTodoList(state: TodoStateModel){
    return state.todos;
  }

  @Action(GetTodos)
  getTodos({getState, setState}: StateContext<TodoStateModel>){
    return this.apiService.getTodos().pipe(
      tap((result) =>{
        const state = getState();
        setState({
          ...state,
          todos: result
        })
      })
    )
}


@Action(AddTodo)
addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: AddTodo){
  return this.apiService.addTodo(payload).pipe(
    tap((result) =>{
      const state = getState();
      patchState({
        todos: [...state.todos, result]
      })
    })
  )
}

@Action(UpdateTodo)
UpdateTodo(
  { getState, setState }: StateContext<TodoStateModel>,
  { payload }: UpdateTodo
) {
  return this.apiService.updateTodo(payload).pipe(
    tap((result) => {
      const state = getState();
      const todoList = [...state.todos];

      // Find the index based on _id
      const todoIndex = todoList.findIndex(item => item._id === payload._id);
      if (todoIndex !== -1) {
        todoList[todoIndex] = result;
      }

      setState({
        ...state,
        todos: todoList
      });
    })
  );
}

@Action(DeleteTodo)
deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo){
  return this.apiService.deleteTodo(id).pipe(
    tap((result) =>{
      const state = getState();
      const filteredArray = state.todos.filter(item => item._id !== id);
      setState({
        ...state,
        todos: filteredArray
      })
    })
  )
}


}
