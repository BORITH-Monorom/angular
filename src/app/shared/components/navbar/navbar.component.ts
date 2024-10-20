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
  menuOpen: boolean= false;
  screenWidth: number = window.innerWidth;
  constructor(
    private authservice: AuthService,
    private sweet: sweetAlert2){
    // Attach a resize event listener to update screen width dynamically
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      // Close the menu if switching back to large screens
      if (this.screenWidth >= 640) {
        this.menuOpen = false; // Close the menu on screen resize for larger screens
      }
    };
    }

  ngOnInit(): void {
    // Get screen width initially
    this.screenWidth = window.innerWidth;

    this.authservice.isLoggedIn$.subscribe((logStatus) =>{
      this.username = this.authservice.getUserName();
      this.isLoggedIn = logStatus;
      const UserRole = this.authservice.getUserRole();
      const Token = this.authservice.getToken();
      if(UserRole === 'admin' && Token !== null){
        this.isAdmin = true;
        console.log(this.isAdmin,"navbar admin is?");
      }else if(UserRole === 'user' && Token !== null){
        this.isAdmin = false;
      }
    })
    this.authservice.getUsers().subscribe((users =>{
      // console.log(users);
    }))

  }
logout():void{
this.sweet.showConfirmationDialog("Logout","Do you want to Logout?", "Yes").then((result) =>{
  if(result.isConfirmed){
    this.authservice.logout();
    this.isAdmin = false;
    this.isLoggedIn = false;
  }
});
}
toggleMenu():void{
this.menuOpen = !this.menuOpen
}
}
