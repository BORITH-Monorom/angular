export class GetMaskmails{
  static readonly type = '[Maskmail] Get';
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
