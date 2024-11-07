import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, Renderer2, signal, viewChild, ViewChild } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../../core/services/auth.service';
import { MaterialModule } from '../../../module/material.module';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';
import { MatAccordion } from '@angular/material/expansion';
import { ThemeService } from '../../../core/services/theme.service';
import { animate, MotionKeyframesDefinition, scroll } from 'motion';
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
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  isAccordionOpen: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username:any;
  constructor(private authservice: AuthService,private sweet: sweetAlert2, private renderer: Renderer2){}
  private themeService = inject(ThemeService);  
  theme = this.themeService.theme;
@ViewChild('accordion') accordion: MatAccordion | undefined;

  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe((logStatus) =>{
      this.username = this.authservice.getUserName();
      this.isLoggedIn = logStatus;
    })
    this.authservice.userRole$.subscribe((userRole) =>{
        this.isAdmin = userRole === 'admin';
    });
    this.authservice.getUsers().subscribe((users =>{
      // console.log(users);
    }))

  }


  toggleTheme(){
    this.themeService.toggleTheme();
  }

  // toggleTheme(){
  //   console.log(`isDarkTheme: ${this.isDarkMode}`);
  //   this.isDarkMode = !this.isDarkMode;
  //   this.themeService.toggleDarkTheme(this.isDarkMode);
  // }

logout():void{
this.sweet.showConfirmationDialog("Logout","Do you want to Logout?", "Yes").then((result) =>{
  if(result.isConfirmed){
    this.authservice.logout();
    this.isAdmin = false;
    this.isLoggedIn = false;
  }
});
}

}
