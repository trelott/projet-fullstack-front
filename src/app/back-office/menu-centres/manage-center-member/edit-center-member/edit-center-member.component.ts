import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-center-member',
  templateUrl: './edit-center-member.component.html',
  styleUrls: ['./edit-center-member.component.scss']
})
export class EditCenterMemberComponent implements OnInit {
  @Input() member!: User;
  @Output() editMemberDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  editCenterMemberForm!: FormGroup;
  constructor() {}
  ngOnInit(): void {
    this.editCenterMemberForm = new FormGroup({
      email: new FormControl(this.member.email),
      firstname: new FormControl(this.member.firstname),
      lastname: new FormControl(this.member.lastname),
      role: new FormControl(this.member.role),
      center: new FormControl(this.member.center.name),
    });
  }

  emitEditMemberDone(value: boolean) {
    this.editMemberDone.emit(value);
  }

  modifyCenterMember() {
    this.emitEditMemberDone(true);
  }
}
