import { Component } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MaterialModule } from '../../../../../module/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-banner',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './view-banner.component.html',
  styleUrl: './view-banner.component.scss'
})
export class ViewBannerComponent {
constructor(public apiService: ApiService,
  private dialogRef: MatDialogRef<ViewBannerComponent>)
{
  this.apiService.getBanners();
}

selectBanner(bannerUrl: string){
  this.dialogRef.close(bannerUrl);
}
}
