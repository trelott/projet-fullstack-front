import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {User} from "../../interfaces/user";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.scss']
})
export class MenuConfigComponent {
  @Input() center!: VaccinationCenter;
  @Input() allCenters: VaccinationCenter[] = [];
  @Output() modificationDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  centerMember?: User[];
  possibleRole: string[] = ['SUPERADMIN'];
  tableColumns: string[] = ['Id', 'Nom et prénom', 'Rôle', 'Actions']
  @Input() maxPossibleRole?: string;
  memberToModify?: User;
  addMember: boolean = false;

  constructor(
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
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
    this.userInfoService.getAllUser().subscribe({
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
