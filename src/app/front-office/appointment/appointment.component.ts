import {Component, Input, OnInit} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {AppointmentService} from "../../services/appointment.service";
import {Appointement} from "../../interfaces/appointement";
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
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      center: new FormControl({ id: this.center.id }, Validators.required),
    })
  }

  public confirmAppointment() {
    if (this.appointmentForm.valid){
      const appointment: Appointement = this.appointmentForm.value;
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
