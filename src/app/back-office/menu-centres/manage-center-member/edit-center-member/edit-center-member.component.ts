import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UserInfoService} from "../../../../services/user-info.service";
import {VaccinationCenter} from "../../../../interfaces/vaccination-center";

@Component({
  selector: 'app-edit-center-member',
  templateUrl: './edit-center-member.component.html',
  styleUrls: ['./edit-center-member.component.scss']
})
export class EditCenterMemberComponent implements OnInit {
  @Input() member!: User;
  @Input() allCenters: VaccinationCenter[] = [];
  @Output() editMemberDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  editCenterMemberForm!: FormGroup;
  @Input() possibleRole!: string[];
  showEditError: boolean = false;
  editErrorMessage: string = "Il y a eu une erreur lors de la modification de l'utilisateur";
  @Input() center!: VaccinationCenter;
  constructor(
    private centerMemberService: UserInfoService,
  ) {}
  ngOnInit(): void {
    this.editCenterMemberForm = new FormGroup({
      email: new FormControl(this.member.email),
      firstname: new FormControl(this.member.firstname),
      lastname: new FormControl(this.member.lastname),
      role: new FormControl(this.member.role),
      center: new FormControl(this.member.center),
    });
  }

  emitEditMemberDone(value: boolean) {
    this.editMemberDone.emit(value);
  }

  modifyCenterMember() {
    const patchedMember: User = {
      id: this.member.id,
      email: this.editCenterMemberForm.get("email")?.value,
      firstname: this.editCenterMemberForm.get("firstname")?.value,
      lastname: this.editCenterMemberForm.get("lastname")?.value,
      role: this.editCenterMemberForm.get("role")?.value,
      center: this.editCenterMemberForm.get("center")?.value,
    }
    this.centerMemberService.patchUser(patchedMember).subscribe({
      next: value => {
        this.showEditError = false
        this.emitEditMemberDone(true);
      },
      error: err => {
        this.showEditError = true;
      }
    });
  }
}
