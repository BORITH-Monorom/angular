import { Component, CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../module/material.module';

@Component({
    selector: 'app-signup',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MaterialModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent{
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  })
}

  onSubmit(): void{
    if(this.signupForm.valid){
      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response) =>{
          this.authService.setToken(response.token); // Stroe token
          this.router.navigate(['/login']); // Redirec after sign-up
        },
        error: (err) => console.log(err, "something went wrong")
      })
    }
  }
}
