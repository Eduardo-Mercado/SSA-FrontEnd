import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GlobalHttpInterceptor } from './core/helpers/httpInterceptor/GlobalHttpInterceptor';
import { GlobalErrorHandler } from './core/helpers/httpInterceptor/GlobalErrorHandler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './shared/layout/layout.component';
import { NavComponent } from './shared/layout/nav/nav.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { JwtInterceptor } from './core/helpers/httpInterceptor/jwt.interceptor';
import { UnauthorizedInterceptor } from './core/helpers/httpInterceptor/unauthorized.interceptor';
import { AuthService } from './core/services/authentication/auth.service';
import { appInitializer } from './core/services/authentication/app-initializer';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer,  multi: true,  deps: [AuthService] },
    { provide: ErrorHandler, useClass: GlobalErrorHandler  },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
