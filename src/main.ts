import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
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
import { NgxsModule, provideStore as provideNgxsStore } from '@ngxs/store';
import { MaskmailState } from './app/core/store/state/maskmail.state';
import { TodoState } from './app/core/store/state/todo.state';
import { SlideState } from './app/core/store/state/slide.state';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
export function tokenGetter() {
  return localStorage.getItem('token');
}
bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    ...JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [`${environment.apiUrl}`],
        disallowedRoutes: [`${environment.apiUrl}/api/auth/login`],
      }
    }).providers || [],

    AuthService,
    AuthGuard,
    JwtHelperService,
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

    // --- NGRX CONFIG ---
    provideStore({
      tasks: taskReducer,
      cart: cartReducer,
      convert: convertReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    // --- NGXS CONFIG (The Fix) ---
    // Removed importProvidersFrom(NgxsModule.forRoot(...))
    provideNgxsStore(
      [MaskmailState, TodoState, SlideState], // States go here
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsLoggerPlugin(),
      withNgxsRouterPlugin(),
      withNgxsWebSocketPlugin()
    ),

    importProvidersFrom(
      MaterialModule,
      TruncateTextPipe
    ),
  ],
}).catch(err => console.error(err, "err in main.ts"));
