import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { Slide } from "../../models/slide.model";
import { patch } from "@ngxs/store/operators";
import { patchState } from "@ngrx/signals";


export class SlideStateModel{
  slides: Slide[] = []
}
export class GetSlides{
  static readonly type = '[Slides] Get Slide';
}

export class AddSlide{
  static readonly type = '[Slides] Add Slide';
  constructor(public formData: FormData){}
}

export class DeleteSlide{
  static readonly type = '[Slides] Delete Slide';
  constructor(public id: string){}
}

@State<SlideStateModel>({
  name: 'slides',
  defaults:{
    slides: []
  }
})

@Injectable()
export class SlideState{
constructor(private apiService: ApiService){}

@Selector()
static getSlideBanner(state: SlideStateModel){
  return state.slides;
}

@Action(GetSlides)
getSlides({getState, setState}: StateContext<SlideStateModel>){
  console.log('Calling API ')
  return this.apiService.getSlide().pipe(
    tap((result) =>{
      console.log('Slide', result)
      const state = getState();
      setState({
        ...state,
        slides: result
      })
    })
  )
}
@Action(AddSlide)
addSlide({getState, patchState}: StateContext<SlideStateModel>, {formData}:AddSlide){
  return this.apiService.postSlide(formData).pipe(
    tap(result =>{
      const newSlide = result.newSlide;
      const state = getState()
      console.log(state.slides, "previous")
      console.log(result, "result add")
      patchState({
        slides:[...state.slides, newSlide ]
      })
    })
  )
}

@Action(DeleteSlide)
deleteSlide({getState,setState}: StateContext<SlideStateModel>, {id}:DeleteSlide){
  console.log('result')
  return this.apiService.deleteSlide(id).pipe(
    tap(result =>{
      console.log(result)
    const state = getState();
    const filteredArray = state.slides.filter(item => item._id != id)
    setState({
      ...getState(),
      slides: filteredArray
    })
    })
  )
}


}
