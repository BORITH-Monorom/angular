import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryListComponent } from "../../../shared/components/category-list/category-list.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MaterialModule } from '../../../module/material.module';
import { BannerTableComponent } from '../banner-table/banner-table.component';
import { FormBannerComponent } from '../form-banner/form-banner.component';
// import { BannerTableComponent } from "../banner-table/banner-table.component";
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CategoryListComponent, MatSidenavModule, MaterialModule, BannerTableComponent, FormBannerComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
viewComponent:string ='formBanner';
drawerOpen:boolean = false;
toggleDrawer(drawer:any){
this.drawerOpen = !this.drawerOpen;
drawer.toggle();
}
toggle(name:string){
  this.viewComponent = name;
}
}
