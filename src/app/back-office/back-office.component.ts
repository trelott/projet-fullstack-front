import {Component, Input, OnInit} from '@angular/core';
import {User} from "../auth/user";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss'],
  host: {
    class: 'full-width'
  }
})
export class BackOfficeComponent implements OnInit{
  loggedUser?: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const token = this.authService.getStoredToken();
    if (token && this.authService.isTokenValid(token)) {
      this.loggedUser = this.authService.getUserInfo(token || '');
    }
    else this.authService.logout();
  }

}
