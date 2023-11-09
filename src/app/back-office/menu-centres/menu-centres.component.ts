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
  showCreateCenter: boolean = false;
  showDeleteError: boolean = false;
  deleteErrorMessage: string = 'Erreur lors de la suppression de ce centre'

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

  setSelectedCenter(center?: VaccinationCenter) {
    console.debug('Set center à:', center);
    this.selectedCenter = center;
    console.debug('selected center est maintenant:', this.selectedCenter);
  }

  setShowCreateCenter(newValue: boolean) {
    this.showCreateCenter = newValue;
  }

  updateCenter() {
    if (this.inputCenterName != '') this.centerService.getVaccinationCenterByName(this.inputCenterName)?.subscribe(result => this.centerList = result);
    else this.centerService.getAllVaccinationCenter().subscribe(
      resultCenter => this.centerList = resultCenter);
  }

  deleteCenter(center: VaccinationCenter) {
    this.centerService.deleteCenter(center.id).subscribe({
      next: (response) => {
        this.showDeleteError = false;
        this.updateCenter();
      },
      error: (error) => {
        this.showDeleteError = true;
      }
    });
  }
}
