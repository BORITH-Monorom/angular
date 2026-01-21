import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class signalService {
  showCodePreview = signal(false);


  toggleCodePreview(){
    this.showCodePreview.set(!this.showCodePreview());
  }
}
