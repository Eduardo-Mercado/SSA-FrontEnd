import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/authentication/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
         if (err.status === 401) {
           this.authService.clearLocalStorage();
           this.router.navigate(['login'], {
             queryParams: { returnUrl: this.router.routerState.snapshot.url }
           });
         }

         if (!environment.baseURL) {
           console.error(err);
         }
         const error = (err && err.error && err.error.message) || err.statusText;
         return throwError(error);
      })
    );
  }
}
