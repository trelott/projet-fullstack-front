import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

class List<T> {
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllUserByCenter(centerId: number): Observable<User[]> {
    return this.httpClient.get<User[]>("/api/admin/user/center/"+centerId);
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>("/api/superadmin/user");
  }

  patchUser(user:User): Observable<User> {
    return this.httpClient.patch<User>("/api/admin/user/" + user.id, user);
  }

  deleteUser(userId: number): Observable<User> {
    return this.httpClient.delete<User>("/api/admin/user/" + userId);
  }
}
