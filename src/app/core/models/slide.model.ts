export interface SliceResponse{
  message: string;
  newSlide:Slide;
}
export interface Slide{
  _id: any|undefined;
  image: string,
  title: string,
  __v?: number;
}
