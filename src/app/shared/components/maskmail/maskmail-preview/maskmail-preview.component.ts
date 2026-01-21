import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MaskmailState } from '../../../../core/store/state/maskmail.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedService } from '../../../../core/services/share.service';
import { MatButtonModule } from '@angular/material/button';
import { isLoading, isPreview } from '../../../../core/store/signal/maskmail.store';


@Component({
    selector: 'app-maskmail-preview',
    templateUrl: './maskmail-preview.component.html',
    imports: [MatButtonModule],
    styleUrl: './maskmail-preview.component.scss'
})
export class MaskmailPreviewComponent implements OnInit {
  @ViewChild('contentToExport',{static: false}) contentToExport!: ElementRef<HTMLElement>

  maskmails:any[]=[]; //step 2
  tableHtml: SafeHtml = '';


  constructor (
    private store:Store,
    public sharedService: SharedService
  ){
  }
  private santizer = inject(DomSanitizer)
  ngOnInit(): void {
    this.store.select(MaskmailState.getMaskmails).subscribe(res => {

      this.maskmails = res //step 1
      if(this.maskmails && this.maskmails[0].description){
        isLoading.set(false)
        isPreview.set(true)
        this.setHtmlContent(); //step 5
      } else {
        console.error('maskmails.description is empty or invalid');
      }
    })

  }

  setHtmlContent():void{
    const rawHtml = `${this.maskmails[0].description}`//step 3

    if(typeof rawHtml === 'string' && rawHtml.trim() !== ''){
      this.tableHtml = this.santizer.bypassSecurityTrustHtml(rawHtml); //step 4
    }else{
      console.error('maskmails.description is not a valid HTML string')
    }

  }


  exportAsHTML(){
    const content = this.contentToExport?.nativeElement;
    if(content){
      const element = document.createElement('a');
      // const htmlContent:any = document.querySelector('table')?.outerHTML;
      const htmlContent = content.outerHTML;
      const file = new Blob([htmlContent],{type: 'text/html'})
      element.href = URL.createObjectURL(file);
      element.download = 'maskmail.html';
      document.body.appendChild(element);
      element.click();
    }
  }
}
