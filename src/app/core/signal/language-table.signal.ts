import { signal } from "@angular/core";

export interface Language{
  id: number;
  language: string;
  speaking: string;
  listening: string;
  writing: string;
  is_checked: boolean;
}

let rowId = 1;

export const userLanguage = signal<Language[]>([
  {
    id: rowId++,
    language: 'select',
    speaking: '',
    listening: '',
    writing: '',
    is_checked: true,
  },
]);


export function addLanguageRow(){
  userLanguage.update((rows) => [
    ...rows,
    {
      id: rowId++,
      language: '',
      speaking: '',
      listening: '',
      writing: '',
      is_checked: true
    }
  ])
}

export function removeLanguageRow(index: number){
  userLanguage.update((rows) => rows.filter((_, i) => i !== index));
}
