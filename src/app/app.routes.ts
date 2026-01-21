import { Routes } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { CategoryListComponent } from './shared/components/category-list/category-list.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { AdminDashboardComponent } from './feature/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/services/admin.guard';
import { CourseComponent } from './shared/components/course/course.component';
import { MaskmailFormComponent } from './shared/components/maskmail/maskmail-form/maskmail-form.component';
import { TodoListComponent } from './core/shared/components/todo-list/todo-list.component';
import { AboutMeComponent } from './shared/components/about-me/about-me.component';
import { ReportComponent } from './shared/components/report/report.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent,},
  {path: 'aboutMe', component: AboutMeComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'course', component: CourseComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard]},
  {path: 'category-list', component: CategoryListComponent,canActivate: [adminGuard]},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'maskmail', component: MaskmailFormComponent},
  {path: 'report', component: ReportComponent},
  {path: 'todo', component: TodoListComponent},

  {path: 'doc',
    loadComponent: () => import('./feature/public/components/document/document.component').then(m => m.DocumentComponent),
    children: [
    {
      path: 'addContact',
      loadComponent: () => import('./feature/public/pages/add-contact/add-contact.component').then(m => m.AddContactComponent)
    },
    {
      path: 'editContact/:id',
      loadComponent: () => import('./feature/public/pages/edit-contact/edit-contact.component').then(m => m.EditContactComponent)
    },
    {
      path: 'crud',
      loadComponent: () => import('./feature/public/pages/contact-list/contact-list.component').then(m => m.ContactListComponent)
    },
    {
        path: 'signal',
        loadComponent: () => import('./feature/public/pages/manage-state-signal-api-v19/manage-state-signal-api-v19.component').then(m => m.ManageStateSignalApiV19Component)
    },
    {
        path: 'reusable-form',
        loadComponent: () => import('./feature/public/components/reusable-form/reusable-form.component').then(m => m.ReusableFormComponent)
    },
    {
        path: 'basic-reactive-form',
        loadComponent: () => import('./feature/public/pages/basic-reactive-form/basic-reactive-form.component').then(m => m.BasicReactiveFormComponent)
    },

  ]},
  {path: '**', redirectTo: ''}
];
