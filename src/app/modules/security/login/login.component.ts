import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginError = false;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router ,
              private activeRoute: ActivatedRoute , private service: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', Validators.required]
    });

    this.subscription = this.service.user$.subscribe((data) => {
      if (this.activeRoute.snapshot.url.length > 0) {
        if (this.activeRoute.snapshot.url[0].path === 'login') {
          const accessToken = localStorage.getItem('access_token');
          const refreshToken = localStorage.getItem('refresh_token');
          if (data && accessToken && refreshToken) {
            const returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || 'Catalog';
            this.router.navigate([returnUrl]);
          }
        }
      }
    });
  }

  public login() {
    if (this.loginForm.invalid) {
      return;
    }
   // const returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || 'Catalog';
    const returnUrl = 'Catalog';
    this.service.login(this.loginForm.controls.userName.value, this.loginForm.controls.pass.value)
                .subscribe(
                  () => {
                    this.router.navigate([returnUrl]);
                  },
                  () => {
                    this.loginError = true;
                  }
                );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
