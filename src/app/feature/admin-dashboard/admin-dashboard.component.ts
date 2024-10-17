import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryListComponent } from "../../shared/components/category-list/category-list.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MaterialModule } from '../../module/material.module';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CategoryListComponent,MatSidenavModule,MaterialModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
showFiller:boolean = true;
drawerOpen:boolean = false;
toggleDrawer(drawer:any){
this.drawerOpen = !this.drawerOpen;
drawer.toggle();
}
}
