import {Component, OnInit} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {VaccinationService} from "../../services/vaccination.service";

@Component({
  selector: 'app-menu-centres',
  templateUrl: './menu-centres.component.html',
  styleUrls: ['./menu-centres.component.scss']
})
export class MenuCentresComponent implements OnInit{
  selectedCenter?: VaccinationCenter;
  centerList?: VaccinationCenter[];
  inputCenterName: string = '';

  constructor(
    private centerService: VaccinationService,
  ) {}

  ngOnInit(): void {
    this.centerService.getAllVaccinationCenter().subscribe(
      centers => {
        this.centerList = centers;
      }
    )
  }

  setSelectedCenter(center: VaccinationCenter) {
    this.selectedCenter = center;
  }

  updateCenter() {
    if (this.inputCenterName != '') this.centerService.getVaccinationCenterByName(this.inputCenterName)?.subscribe(result => this.centerList = result);
    else this.centerService.getAllVaccinationCenter().subscribe(
      resultCenter => this.centerList = resultCenter);
  }
}
