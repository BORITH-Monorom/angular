import { Component } from '@angular/core';
import { CategoryListComponent } from "../category-list/category-list.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
