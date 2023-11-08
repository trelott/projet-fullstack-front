import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appointement} from "../interfaces/appointement";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) {}

  postAppointment(newAppointment: Appointement): Observable<Appointement> {
    return this.httpClient.post<Appointement>("/api/public/appointment", newAppointment)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          throw error; // rethrow the error to propagate it to the component
        })
      );
  }
}
