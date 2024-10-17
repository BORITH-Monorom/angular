import { createAction, props } from "@ngrx/store";

// Action to convert pounds to kilograms
export const convertToKg = createAction('[Conversion] convert to KG', props<{lb:number}>())

