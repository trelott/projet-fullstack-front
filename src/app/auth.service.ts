import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "./auth/user";
import {AuthResponse} from "./auth/authResponse";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.userSubject =  new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.httpClient.post<AuthResponse>("/api/public/auth", { username, password })
      .pipe(map((response) => {
        localStorage.setItem('user_token', JSON.stringify(response.token));
        const user: User = this.getUserInfo(response.token);
        this.userSubject.next(user);
        this.router.navigate(['back']);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user_token');
    this.userSubject.next(null);
    this.router.navigate(["/auth"]);
  }

  getStoredToken (){
    return localStorage.getItem('user_token')
  }

  isTokenValid(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  getUserInfo(token: string): User {
    const parsedToken = (JSON.parse(atob(token.split('.')[1])))
    return {
      id: parsedToken.id,
      email: parsedToken.email,
      firstname: parsedToken.firstname,
      lastname: parsedToken.lastname,
      role: parsedToken.role,
      center: parsedToken.center || null,
    };
  }


}
