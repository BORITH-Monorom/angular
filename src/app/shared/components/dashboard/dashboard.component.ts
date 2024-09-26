import { Component } from '@angular/core';
import { CategoryListComponent } from "../category-list/category-list.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryListComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isAdmin: boolean = false;
  constructor(private auth: AuthService){
   const userRole = this.auth.getUserRole()
   if(userRole === "admin"){
    this.isAdmin = true;
   }
  }

}
