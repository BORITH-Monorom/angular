import { Component, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
 import {MatListModule} from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CodePreviewComponent } from '../../../../shared/components/code-preview/code-preview.component';
import { signalService } from '../../../../core/services/signal.service';
import { activeCodePreviewId } from '../../../../core/signal/store/code-preview.store';
@Component({
  selector: 'app-document',
  imports: [MatIconModule, RouterOutlet, MatListModule, RouterLink, CodePreviewComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent {
signalService = inject(signalService)

showCode = this.signalService.showCodePreview;

activeId = activeCodePreviewId;
}
