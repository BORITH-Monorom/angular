import { Action, Selector, State, StateContext } from "@ngxs/store";
// import { Maskmail } from "../../models/maskmail.model";
import { ApiService } from "../../services/api.service";
// import { AddMaskmail, DeleteMaskmail, GetMaskmails, UpdateMaskmail } from "../actions/maskmail.actions";
import { tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface Maskmail{
  _id: string | undefined;
  banner: string;
  description: string;
  footer: string;
}

export class MaskmailStateModel {
  maskmails: Maskmail[] = [];
  selectedMaskmail: Maskmail | null = null;
}

export class GetMaskmails{
  static readonly type = '[Maskmail] Get';
}

export class SetSelectedMaskmail{
  static readonly type = '[Maskmail] Set Selected Maskmail';
  constructor(public payload: Maskmail){}
}

export class AddMaskmail{
  static readonly type = '[Maskmail] Add';
  constructor(public payload: any){}
}

export class DeleteMaskmail{
  static readonly type = '[Maskmail] Delete';
  constructor(public id: string){}
}

export class UpdateMaskmail{
  static readonly type = '[Maskmail] Update';
  constructor(public id: string, public payload: any){}
}



@State<MaskmailStateModel>({
  name: 'maskmail',
  defaults: {
    maskmails: [],
    selectedMaskmail: null
  }
})
@Injectable()
export class MaskmailState{
  constructor(private apiService: ApiService){}

  @Selector()
  static getMaskmails(state: MaskmailStateModel){
    return state.maskmails;
  }
  @Selector()
  static getSelectedMaskmail(state: MaskmailStateModel){
    return state.selectedMaskmail
  }

  @Action(SetSelectedMaskmail)
  setSelectedMaskmail({patchState}: StateContext<MaskmailStateModel>, {payload}: SetSelectedMaskmail){
    patchState({
      selectedMaskmail: payload
    })
  }
  @Action(GetMaskmails)
  getMaskmails({ getState, setState }: StateContext<MaskmailStateModel>) {
    return this.apiService.getMaskmail().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          maskmails: result
        });
      })
    );
  }

  @Action(AddMaskmail)
  addMaskmail({ getState, patchState }: StateContext<MaskmailStateModel>, { payload }: AddMaskmail) {
    return this.apiService.postMaskmail(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          maskmails: [...state.maskmails, result]
        });
      })
    );
  }

  @Action(DeleteMaskmail)
  deleteMaskmail({ getState, setState}: StateContext<MaskmailStateModel>, {id}: DeleteMaskmail){
    return this.apiService.deleteMaskmail(id).pipe(
      tap(()=>{
        const state = getState();
        const updatedMaskmailsList = state.maskmails.filter(maskmail => maskmail._id !== id);
        setState({
          ...state,
          maskmails: updatedMaskmailsList
        })
      })
    )
  }


  @Action(UpdateMaskmail)
  updateMaskmail({ getState, setState}: StateContext<MaskmailStateModel>, {id, payload}: UpdateMaskmail){
    return this.apiService.updateMaskmail(id, payload).pipe(
      tap((result)=>{
        const state = getState();
        const maskmailsList = [...state.maskmails];
        const index = maskmailsList.findIndex((item => item._id === id));
        maskmailsList[index] = result;
        setState({
          ...state,
          maskmails: maskmailsList
        })
      })
    )
  }

}
