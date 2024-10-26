import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { ApiService } from '../../../core/services/api.service';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';

@Component({
  selector: 'app-form-banner',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './form-banner.component.html',
  styleUrl: './form-banner.component.scss'
})
export class FormBannerComponent implements OnInit {
name: any;
banners: any;
  constructor(public apiService: ApiService, private sweetalert: sweetAlert2) {
  }
  ngOnInit(): void {
    this.apiService.getBanners()
  }

  onDelete(id:any){
    this.sweetalert.showConfirmationDialog("Are you sure you want to delete","This delete will permanently delete the banner", "Delete").then(res => {
      if(res.isConfirmed){

        this.apiService.deleteBanner(id);
      }
    })
  }

  open() {
    this.apiService.postBanner({ name: this.name, banner: this.banners });
  }
}
