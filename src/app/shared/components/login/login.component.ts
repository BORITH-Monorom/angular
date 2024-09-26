import { Component } from '@angular/core';
import { MaterialModule } from '../../../module/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { sweetAlert2 } from '../../../core/services/sweetalert.utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm: FormGroup;
constructor(
  private fb: FormBuilder,
  private authService:AuthService,
  private router: Router,
  private SweetAlert2: sweetAlert2,
){
  this.loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
  })
}
  onSubmit(): void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) =>{
          this.SweetAlert2.showSuccessAlert('Login Successfully');
          this.authService.setToken(response.token); //Store the JWT token
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.SweetAlert2.showErrorAlert('something went wrong');
        }
      })
    }
  }
}
