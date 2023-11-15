import {VaccinationCenter} from "./vaccination-center";

export interface User {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  center?: VaccinationCenter;
  password?: string;
}
