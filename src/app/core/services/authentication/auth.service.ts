import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUser } from '../../models/security/applicationUser.model';

interface LoginResult {
  id: number;
  username: string;
  role: string;
  originalUserName: string;
  accessToken: string;
  refreshToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private Url = environment.baseURL + '/Authentication';

  private timer: Subscription;
  private user = new BehaviorSubject<ApplicationUser>(null);
  user$: Observable<ApplicationUser> = this.user.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
   }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.user.next(null);
      }
      if (event.key === 'login-event') {
        location.reload();
      }
    }
   }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  login(username: string, password: string) {
    return this.http.post<LoginResult>(this.Url + '/authenticate', {username, password})
              .pipe(
                map((data) => {
                  this.user.next({ username: data.username, role: data.role ,  originalUserName: data.originalUserName, id: data.id});
                  this.setLocalStorage(data);
                  localStorage.setItem('login-event', 'login' + Math.random());
                  this.startTokenTimer();
                  return data;
                })
              );
  }

  logout() {
    this.http.post<unknown>(this.Url + '/logout', { })
        .pipe(
          finalize(() => {
            this.clearLocalStorage();
            this.user.next(null);
            this.stopTokenTimer();
            this.router.navigate(['login']);
          })
        ).subscribe();
   }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.log('here')
      this.clearLocalStorage();
      return of(null);
    }

    return this.http.post<LoginResult>(this.Url + '/refresh-token', {refreshToken})
               .pipe(
                 map( (x) => {
                   this.user.next({
                     username: x.username,
                      role: x.role,
                      originalUserName: x.originalUserName,
                       id: x.id
                   });
                   this.setLocalStorage(x);
                   this.startTokenTimer();
                   return x;
                 })
               );
  }

  setLocalStorage(data: LoginResult) {
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
   }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainTime() {
    const accesToken = localStorage.getItem('access_token');
    if (!accesToken) {
      return 0;
    }
    const jwtToken =  JSON.parse(atob(accesToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000 );
    return expires.getTime() - Date.now();
   }

  private startTokenTimer() {
    const timeout = this.getTokenRemainTime();
    this.timer = of(true)
                .pipe(
                  delay(timeout),
                  tap(() => this.refreshToken().subscribe())
                ).subscribe();
   }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }

  getOptionSystem() {
   return this.http.post<any>(this.Url + '/getMenu', null);
  }

}
