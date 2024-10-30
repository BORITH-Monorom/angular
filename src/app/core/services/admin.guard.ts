import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userRole$.pipe(
    map((userRole) => userRole === 'admin'),
    tap((isAdmin) => {
      if(!isAdmin) {
        router.navigate(['/home']);
      }
    })
  );
};
