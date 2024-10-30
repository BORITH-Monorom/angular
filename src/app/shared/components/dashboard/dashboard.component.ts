import { Component } from '@angular/core';
import { CategoryListComponent } from "../category-list/category-list.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { BannerTableComponent } from "../../../feature/admin/banner-table/banner-table.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryListComponent, CommonModule, BannerTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isAdmin: boolean = false;
  constructor(private auth: AuthService){
   this.auth.userRole$.subscribe((userRole) =>{
    if(userRole === "admin"){
      this.isAdmin = true;
    }
   })
  }

}
