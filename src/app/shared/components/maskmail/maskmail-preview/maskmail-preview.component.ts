import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MaskmailState } from '../../../../core/store/state/maskmail.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedService } from '../../../../core/services/share.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-maskmail-preview',
    templateUrl: './maskmail-preview.component.html',
    imports: [MatButtonModule],
    styleUrl: './maskmail-preview.component.scss'
})
export class MaskmailPreviewComponent implements OnInit {
  maskmails:any[]=[];
  tableHtml: SafeHtml = '';

  constructor (
    private store:Store,
    public sharedService: SharedService
  ){
  }
  private santizer = inject(DomSanitizer)
  ngOnInit(): void {
    this.store.select(MaskmailState.getMaskmails).subscribe(res => {
      this.maskmails = res
      console.log('Maskmail data:', this.maskmails);
      if(this.maskmails && this.maskmails[0].description){
        this.setHtmlContent();
      } else {
        console.error('maskmails.description is empty or invalid');
      }
    })

  }

  setHtmlContent():void{
    const rawHtml = `${this.maskmails[0].description}`
    console.log('Raw HTML:', rawHtml);

    if(typeof rawHtml === 'string' && rawHtml.trim() !== ''){
      this.tableHtml = this.santizer.bypassSecurityTrustHtml(rawHtml);
      console.log(this.tableHtml, 'tableHtml');
      console.log('Html content set');
    }else{
      console.error('maskmails.description is not a valid HTML string')
    }

  }


  exportAsHTML(){
    const element = document.createElement('a');
    const htmlContent:any = document.querySelector('table')?.outerHTML;
    const file = new Blob([htmlContent],{type: 'text/html'})
    element.href = URL.createObjectURL(file);
    element.download = 'maskmail.html';
    document.body.appendChild(element);
    element.click();
  }
}
