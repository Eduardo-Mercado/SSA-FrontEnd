import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/authentication/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add JWT auth header if a user is logged in for API requests
    const accesToken  = localStorage.getItem('access_token');
    const isApiUrl = request.url.startsWith(environment.baseURL);
    if (accesToken && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + accesToken }
      });
    }
    return next.handle(request);
  }
}
