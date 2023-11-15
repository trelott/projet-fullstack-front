import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VaccinationCenter} from "../../../interfaces/vaccination-center";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user";

@Component({
  selector: 'app-create-superadmin',
  templateUrl: './create-superadmin.component.html',
  styleUrls: ['./create-superadmin.component.scss']
})
export class CreateSuperadminComponent {
  @Output() createDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  createSuperadminForm!: FormGroup;
  showCreateError: boolean = false;
  createErrorMessage: string = "Il y a eu une erreur lors de la création de l'utilisateur";

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.createSuperadminForm = new FormGroup({
      email: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      password: new FormControl('')
    });
  }

  emitCreateDone(value: boolean): void {
    this.createDone.emit(value);
  }

  createSuperadmin() {
    const newSuperadmin: User = {
      email: this.createSuperadminForm.get("email")?.value,
      password: this.createSuperadminForm.get("password")?.value,
      firstname: this.createSuperadminForm.get("firstname")?.value,
      lastname: this.createSuperadminForm.get("lastname")?.value,
      role: 'SUPERADMIN',
    }
    this.authService.register(newSuperadmin).subscribe({
      next: value => {
        this.showCreateError = false;
        this.emitCreateDone(true);
      },
      error: err => {
        this.showCreateError = true;
      }
    })
  }
}
