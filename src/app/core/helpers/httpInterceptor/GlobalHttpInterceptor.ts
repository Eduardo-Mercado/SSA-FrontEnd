import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptor implements HttpInterceptor {
  // https://www.tektutorialshub.com/angular/angular-httpclient-http-interceptor/

  // private readonly BaseUrl = environment.baseURL;
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    // }
    // check current value of the header: req.headers.get('Accept')
    // remove a header: req = req.clone({ headers: req.headers.delete('Content-Type','application/json')})

    /*
     const token: string =authService.Token; //Get token from some service
     if (token) {
       req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
     }
   */

    return next.handle(req).pipe(
      retry(environment.timeRetry)
      , catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log('error status :' + error.status + ' ' + error.statusText);
            switch (error.status) {
              case 401:      // login
                this.router.navigate(['/']);
                break;
              case 403:     // forbidden
                this.router.navigateByUrl('/unauthorized');
                break;
            }
          }
        }
        console.error(' some thing else happened ' + error.message);

        return throwError(error.message);
      })
    );
  }

}
