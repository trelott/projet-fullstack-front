import { Injectable } from '@angular/core';
import {VaccinationCenter} from "../interfaces/vaccination-center";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  constructor(private httpClient: HttpClient) { }

  getAllVaccinationCenter(): Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>("/api/public/center");
  }

  getVaccinationCenterById(id: number): Observable<VaccinationCenter> | undefined{
    return this.httpClient.get<VaccinationCenter>("/api/public/center/"+id);
  }

  getVaccinationCenterByCity(city: string): Observable<VaccinationCenter[]> | undefined{
    return this.httpClient.get<VaccinationCenter[]>("/api/public/center/city/"+city);
  }


  getVaccinationCenterByName(centerName: string) {
    return this.httpClient.get<VaccinationCenter[]>("/api/public/center/name/"+centerName);
  }

  patchCenter(center: VaccinationCenter) {
    return this.httpClient.patch("/api/superadmin/center/"+center.id, center)
  }

  createCenter(center: VaccinationCenter) {
    return this.httpClient.post("/api/superadmin/center", center)
  }

  deleteCenter(idToDelete: number) {
    return this.httpClient.delete("/api/superadmin/center/"+idToDelete)
  }
}
