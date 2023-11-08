import {Component, OnInit} from '@angular/core';
import {VaccinationCenter} from "./vaccination-center";
import {VaccinationService} from "../vaccination.service";

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss'],
  host: {
    id: 'app-vaccination-center-list'
  }
})
export class VaccinationCenterListComponent implements OnInit {
  centers?: VaccinationCenter[];
  selectedCity : string = '';
  selected?: VaccinationCenter;
  constructor(private readonly vaccinationService: VaccinationService) {}

  ngOnInit() {
    this.vaccinationService.getAllVaccinationCenter().subscribe(
      resultCenter => this.centers = resultCenter)
  }

  public selectCenter(center: VaccinationCenter): void {
    this.selected = center;
  }

  onDeleted(center: VaccinationCenter) {
    delete this.selected;
    this.centers!.splice(this.centers!.indexOf(center), 1);
  }

  public updateCenter() {
    if (this.selectedCity != '') this.vaccinationService.getVaccinationCenterByCity(this.selectedCity)?.subscribe(result => this.centers = result);
    else this.vaccinationService.getAllVaccinationCenter().subscribe(
      resultCenter => this.centers = resultCenter);
  }

}
