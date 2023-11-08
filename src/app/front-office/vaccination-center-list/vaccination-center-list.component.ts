import {Component, OnInit} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {VaccinationService} from "../../services/vaccination.service";

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

  public updateCenter() {
    if (this.selectedCity != '') this.vaccinationService.getVaccinationCenterByCity(this.selectedCity)?.subscribe(result => this.centers = result);
    else this.vaccinationService.getAllVaccinationCenter().subscribe(
      resultCenter => this.centers = resultCenter);
  }

}
