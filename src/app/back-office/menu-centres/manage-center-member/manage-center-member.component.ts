import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VaccinationCenter} from "../../../interfaces/vaccination-center";
import {User} from "../../../interfaces/user";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'app-manage-center-member',
  templateUrl: './manage-center-member.component.html',
  styleUrls: ['./manage-center-member.component.scss']
})
export class ManageCenterMemberComponent implements OnInit{
  @Input() center!: VaccinationCenter;
  @Input() allCenters: VaccinationCenter[] = [];
  @Output() modificationDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  centerMember?: User[];
  possibleRole: string[] = ['USER'];
  tableColumns: string[] = ['Id', 'Nom et prénom', 'Rôle', 'Actions']
  @Input() maxPossibleRole?: string;
  memberToModify?: User;
  addMember: boolean = false;

  constructor(
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    if (this.maxPossibleRole == 'SUPERADMIN') this.possibleRole.push('ADMIN', 'SUPERADMIN');
    else if (this.maxPossibleRole == 'ADMIN') this.possibleRole.push('ADMIN');
    this.updateCenterMember();
  }

  cancelManageCenter() {
    this.modificationDone.emit(true);
  }

  setMemberToModify(member?: User) {
    this.memberToModify = member;
  }

  deleteMember(member: User) {
    this.userInfoService.deleteUser(member.id).subscribe({
      next: value => {
        this.updateCenterMember();
      }
    });
  }

  updateCenterMember(): void {
    this.userInfoService.getAllUserByCenter(this.center.id).subscribe({
      next: value => {
        this.centerMember = value.filter(
          (user) => {
            return this.possibleRole.includes(user.role);
          }
        );
      }
    });
  }

  setAddMember(value: boolean) {
    this.addMember = value;
  }
}
