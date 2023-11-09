import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VaccinationCenter} from "../../../interfaces/vaccination-center";
import {FormControl, FormGroup} from "@angular/forms";
import {AppointmentService} from "../../../services/appointment.service";
import {VaccinationService} from "../../../services/vaccination.service";

@Component({
  selector: 'app-edit-centre',
  templateUrl: './edit-centre.component.html',
  styleUrls: ['./edit-centre.component.scss']
})
export class EditCentreComponent implements OnInit{
  @Input() center!: VaccinationCenter;
  centerForm!: FormGroup;
  @Output() patchSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  patchErrorMessage: string = 'Il y a eu une erreur lors de la modification du centre';
  showErrorMessage: boolean = false;

  constructor(
    private centerService: VaccinationService
  ) {}

  ngOnInit(): void {
    this.centerForm = new FormGroup({
      name: new FormControl(this.center?.name),
      city: new FormControl(this.center?.city),
      city_code: new FormControl(this.center?.city_code),
      address: new FormControl(this.center?.address)
    })
  }

  modifyCenter() {
    this.center.name = this.centerForm.get('name')?.value;
    this.center.city = this.centerForm.get('city')?.value;
    this.center.city_code = this.centerForm.get('city_code')?.value;
    this.center.address = this.centerForm.get('address')?.value;
    this.centerService.patchCenter(this.center).subscribe({
      next: (response) => {
        this.showErrorMessage = false;
        this.patchSuccess.emit(true);
      },
      error: (error) => {
        this.showErrorMessage = true;
      }
    });
  }


}
