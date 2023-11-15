import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Input() loggedUser?: User;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  public goToBack(): void {
    this.router.navigate(['back']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['front'])
  }
}
