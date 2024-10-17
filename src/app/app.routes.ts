import { Routes } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { CategoryListComponent } from './shared/components/category-list/category-list.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { AdminDashboardComponent } from './feature/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/services/admin.guard';
import { CourseComponent } from './shared/components/course/course.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent,},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'course', component: CourseComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard]},
  {path: 'category-list', component: CategoryListComponent,canActivate: [adminGuard]},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];
