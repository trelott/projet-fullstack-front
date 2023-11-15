import {VaccinationCenter} from "./vaccination-center";

export interface Appointement {
  id?: number,
  mail: string,
  phone: number,
  firstname: string,
  lastname: string,
  date: Date,
  vaccinated?: boolean,
  center: VaccinationCenter
}
