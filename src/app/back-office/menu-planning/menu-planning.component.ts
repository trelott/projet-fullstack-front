import {Component, Input, OnInit} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {AppointmentService} from "../../services/appointment.service";
import {Appointement} from "../../interfaces/appointement";

@Component({
  selector: 'app-menu-planning',
  templateUrl: './menu-planning.component.html',
  styleUrls: ['./menu-planning.component.scss']
})
export class MenuPlanningComponent implements OnInit{
  @Input() center!: VaccinationCenter;
  selectedDate: Date = new Date();
  searchInput: string = '';
  appointmentList: Appointement[] = [];
  filteredAppointmentList: Appointement[] = [];

  constructor(
    private appointmentService: AppointmentService,
  ) {}

  ngOnInit(): void {
    this.updateAppointment();
  }

  updateAppointment() {
    this.appointmentService.getAppointmentByDate(this.selectedDate).subscribe({
      next: value => {
        this.appointmentList = value;
        this.updateAppointmentSearch();
      }
    });
  }

  setDateNextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.updateAppointment();
  }

  setDatePreviousDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.updateAppointment();
  }

  validateAppointment(appointment: Appointement) {
    appointment.vaccinated = true;
    this.appointmentService.patchAppointment(appointment).subscribe({
      next: value => {
        this.updateAppointment();
      }
    });
  }

  updateAppointmentSearch() {
    if(this.searchInput == '') this.filteredAppointmentList = this.appointmentList;
    else this.filteredAppointmentList = this.appointmentList.filter(value => {
        const completeName = value.firstname.toLowerCase() + ' ' + value.lastname.toLowerCase();
        return completeName.includes(this.searchInput.toLowerCase());
      });
  }
}
