import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {VaccinationService} from "../../../services/vaccination.service";
import {VaccinationCenter} from "../../../interfaces/vaccination-center";

@Component({
  selector: 'app-create-centre',
  templateUrl: './create-centre.component.html',
  styleUrls: ['./create-centre.component.scss']
})
export class CreateCentreComponent implements OnInit{
  @Input() center!: VaccinationCenter;
  centerForm!: FormGroup;
  @Output() postSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  postErrorMessage: string = 'Il y a eu une erreur lors de la création du centre';
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

  createCenter() {
    this.center = this.centerForm.value
    this.centerService.createCenter(this.center).subscribe({
      next: (response) => {
        this.showErrorMessage = false;
        this.postSuccess.emit(true);
      },
      error: (error) => {
        this.showErrorMessage = true;
      }
    });
  }
}
