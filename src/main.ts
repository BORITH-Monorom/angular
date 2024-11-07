import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/core/services/auth.service';
import { AuthGuard } from './app/core/services/auth.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MaterialModule } from './app/module/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { taskReducer } from './app/core/store/reducers/task.reducer';
import { cartReducer } from './app/core/store/reducers/cart.reducer';
import { convertReducer } from './app/core/store/reducers/convert.reducer';
import { environment } from './environments/environment';
import { TruncateTextPipe } from './app/_utils/pipes/truncate-text.pipe';
import { NgxsModule } from '@ngxs/store';
import { MaskmailState } from './app/core/store/state/maskmail.state';
import { TodoState } from './app/core/store/state/todo.state';
export function tokenGetter() {
  return localStorage.getItem('token');
}
bootstrapApplication(AppComponent, {
  providers: [
    ...JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [`${environment.apiUrl}`],
        disallowedRoutes: [`${environment.apiUrl}/api/auth/login`],
      }
    }).providers || [], // Make sure to call `.providers` here!
    AuthService,
    AuthGuard,
    JwtHelperService,
    provideRouter(routes),
    provideStore(
      {tasks: taskReducer,
       cart: cartReducer,
       convert: convertReducer,
      },
    ),
    provideHttpClient(),
    importProvidersFrom(
      NgxsModule.forRoot([MaskmailState,TodoState]),  // This is the key fix
      MaterialModule,
      TruncateTextPipe
    ),

    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }), provideAnimationsAsync()
  ],
}).catch(err => console.log(err,"err in main.ts"));
