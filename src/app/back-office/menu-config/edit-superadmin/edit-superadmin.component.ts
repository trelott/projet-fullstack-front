import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../interfaces/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'app-edit-superadmin',
  templateUrl: './edit-superadmin.component.html',
  styleUrls: ['./edit-superadmin.component.scss']
})
export class EditSuperadminComponent {
  @Input() member!: User;
  @Output() editMemberDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  editSuperadminForm!: FormGroup;
  showEditError: boolean = false;
  editErrorMessage: string = "Il y a eu une erreur lors de la modification de l'utilisateur";
  constructor(
    private centerMemberService: UserInfoService,
  ) {}
  ngOnInit(): void {
    this.editSuperadminForm = new FormGroup({
      email: new FormControl(this.member.email),
      firstname: new FormControl(this.member.firstname),
      lastname: new FormControl(this.member.lastname),
    });
  }

  emitEditMemberDone(value: boolean) {
    this.editMemberDone.emit(value);
  }

  modifyCenterMember() {
    const patchedSuperadmin: User = {
      id: this.member.id,
      email: this.editSuperadminForm.get("email")?.value,
      firstname: this.editSuperadminForm.get("firstname")?.value,
      lastname: this.editSuperadminForm.get("lastname")?.value,
      role: 'SUPERADMIN',
    }
    this.centerMemberService.patchUser(patchedSuperadmin).subscribe({
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
