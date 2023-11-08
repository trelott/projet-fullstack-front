import {Component, Input, OnInit} from '@angular/core';
import {User} from "../interfaces/user";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {VaccinationService} from "../services/vaccination.service";

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
  selectedMenu?: string;

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

  setSelectedMenu(newSelectedMenu: string) {
    this.selectedMenu = newSelectedMenu;
  }

}
