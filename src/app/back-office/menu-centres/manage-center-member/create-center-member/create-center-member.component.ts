import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {FormControl, FormGroup} from "@angular/forms";
import {VaccinationCenter} from "../../../../interfaces/vaccination-center";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-create-center-member',
  templateUrl: './create-center-member.component.html',
  styleUrls: ['./create-center-member.component.scss']
})
export class CreateCenterMemberComponent implements OnInit{
  @Output() createDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() possibleRole!: string[];
  @Input() center!: VaccinationCenter;
  createCenterMemberForm!: FormGroup;
  showCreateError: boolean = false;
  createErrorMessage: string = "Il y a eu une erreur lors de la création de l'utilisateur";

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.createCenterMemberForm = new FormGroup({
      email: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl('')
    });
  }

  emitCreateDone(value: boolean): void {
    this.createDone.emit(value);
  }

  createCenterMember() {
    const newMember: User = {
      email: this.createCenterMemberForm.get("email")?.value,
      password: this.createCenterMemberForm.get("password")?.value,
      firstname: this.createCenterMemberForm.get("firstname")?.value,
      lastname: this.createCenterMemberForm.get("lastname")?.value,
      role: this.createCenterMemberForm.get("role")?.value,
      center: this.center,
    }
    this.authService.register(newMember).subscribe({
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
