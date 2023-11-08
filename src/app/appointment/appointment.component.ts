import {Component, Input, OnInit} from '@angular/core';
import {VaccinationCenter} from "../vaccination-center-list/vaccination-center";
import {AppointmentService} from "../appointment.service";
import {Appointement} from "./appointement";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @Input() center!: VaccinationCenter;
  appointmentForm!: FormGroup;
  showConfirmation = false;
  showError = false;

  constructor(
    private appointmentService: AppointmentService
  ) {}

  public ngOnInit() {
    this.appointmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      center: new FormControl({ id: this.center.id }, Validators.required),
    })
  }

  public confirmAppointment() {
    if (this.appointmentForm.valid){
      const appointment: Appointement = this.appointmentForm.value;
      console.log(appointment);
      this.appointmentService.postAppointment(appointment).subscribe();
      this.showConfirmation = true;
      this.showError = false;
      this.appointmentForm.reset()
    } else {
      this.showConfirmation = false;
      this.showError = true;
    }
  }

}
