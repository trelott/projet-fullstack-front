import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  host: {
    class: 'full-width'
  }
})
export class AuthComponent {
  invalidCredentialError: boolean;
  invalidFormError: boolean;
  authForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.invalidCredentialError = false;
    this.invalidFormError = false;
    this.authForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login(): void {
    if (this.authForm.valid) {
      this.invalidFormError = false;
      this.authService.login(
        this.authForm.controls['userName'].value,
        this.authForm.controls['password'].value
      ).subscribe();
    } else this.invalidFormError = true;
  }

  logout() {
    return this.authService.logout()
  }
}
