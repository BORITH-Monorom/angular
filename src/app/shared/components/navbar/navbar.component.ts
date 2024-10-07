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
  username:any;
  constructor(
    private authservice: AuthService,
    private sweet: sweetAlert2){}

  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe((logStatus) =>{
      console.log(logStatus);
      this.username = this.authservice.getUserName();
      this.isLoggedIn = logStatus;
      if(this.authservice.getUserRole() === 'admin'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      console.log(this.isAdmin,"admin?");
    })
    this.authservice.getUsers().subscribe((users =>{
      console.log(users);
    }))

  }
logout():void{
this.sweet.showConfirmationDialog("Logout","Do you want to Logout?", "Yes").then((result) =>{
  if(result.isConfirmed){
    this.authservice.logout();
  }
});
}

}
