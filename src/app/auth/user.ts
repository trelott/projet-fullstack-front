import {VaccinationCenter} from "../vaccination-center-list/vaccination-center";

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  center: VaccinationCenter
}
