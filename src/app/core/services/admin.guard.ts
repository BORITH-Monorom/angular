import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getUserRole();
  console.log(userRole);
  if(userRole === 'admin'){
    return true;
  } else{
    router.navigate(['/home']);
    return false;
  }
};
