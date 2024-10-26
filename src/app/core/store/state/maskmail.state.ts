import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Maskmail } from "../../models/maskmail.model";
import { ApiService } from "../../services/api.service";
import { AddMaskmail, DeleteMaskmail, GetMaskmails, UpdateMaskmail } from "../actions/maskmail.actions";
import { tap } from "rxjs";
import { Injectable } from "@angular/core";

export class MaskmailStateModel {
  maskmails: Maskmail[] = [];
}


@State<MaskmailStateModel>({
  name: 'maskmail',
  defaults: {
    maskmails: []
  }
})
@Injectable()
export class MaskmailState{
  constructor(private apiService: ApiService){}

  @Selector()
  static getMaskmails(state: MaskmailStateModel){
    return state.maskmails;
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
