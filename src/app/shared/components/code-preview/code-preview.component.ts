import { Component, Input } from '@angular/core';
import { htmlCode, tsCode } from '../../../core/signal/store/code-preview.store';


@Component({
  selector: 'app-code-preview',
  imports: [],
  templateUrl: './code-preview.component.html',
  styleUrl: './code-preview.component.scss'
})
export class CodePreviewComponent {
  html = htmlCode;
  ts = tsCode;

}
