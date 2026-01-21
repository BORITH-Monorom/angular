import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";

export interface reportStateModel{
  report: any[]
}
export class getReport{
  static readonly type = '[report] get'
}

@State<reportStateModel>({
  name: 'report',
  defaults:{
    report: []
  }
})

@Injectable()
export class reportState{
constructor(private apiService: ApiService){}

@Selector()
static getReport(state: reportStateModel){
  return state.report;
}

@Action(getReport)
getReport({getState,setState}: StateContext<reportStateModel>){
  return this.apiService.getCampaign().pipe(
    tap(result =>{
      const state = getState;
        setState({
          ...state,
          report: result
        })
    })
  )
}

// }
} 
