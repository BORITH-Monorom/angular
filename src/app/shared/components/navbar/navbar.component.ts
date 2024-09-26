import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterModule, ROUTES } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../../core/services/auth.service';
import { MaterialModule } from '../../../module/material.module';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';

// import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    SignupComponent,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private authservice: AuthService,
    private sweet: sweetAlert2){}

  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe((logStatus) =>{
      console.log(logStatus);
      this.isLoggedIn = logStatus;
      this.isAdmin = this.authservice.getUserRole() === 'admin'
    })
  }
logout():void{
this.sweet.showConfirmationDialog("Logout","Do you want to Logout?", "Yes").then((result) =>{
  if(result.isConfirmed){
    this.authservice.logout();
  }
});
}

}
