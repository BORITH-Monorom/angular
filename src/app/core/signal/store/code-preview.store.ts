// code-preview.store.ts
import { signal } from '@angular/core';
export const htmlCode = signal('');
export const tsCode = signal('');

export const activeCodePreviewId = signal<string | null>(null);

export function toggleCodePreview(id:string,html:string,ts:string) {
  if(activeCodePreviewId() === id){
    activeCodePreviewId.set(null); //hide if already showing
  }else{
    activeCodePreviewId.set(id);
    htmlCode.set(html);
    tsCode.set(ts);
  }
}

// export const showCodePreview = signal(false);
// showCodePreview.set(!showCodePreview());

export function setCode(html: string, ts: string) {
  htmlCode.set(html);
  tsCode.set(ts);
}
