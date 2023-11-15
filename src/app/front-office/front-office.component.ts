import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.scss'],
  host: {
    class: 'full-width'
  }
})
export class FrontOfficeComponent implements OnInit{
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    if (this.authService.isTokenValid(this.authService.getStoredToken() || '')) this.authService.logout();
  }

}
