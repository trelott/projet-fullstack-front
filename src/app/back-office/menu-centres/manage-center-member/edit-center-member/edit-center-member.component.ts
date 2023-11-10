import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-edit-center-member',
  templateUrl: './edit-center-member.component.html',
  styleUrls: ['./edit-center-member.component.scss']
})
export class EditCenterMemberComponent implements OnInit {
  @Input() member!: User;
  @Output() editMemberDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
  }
  ngOnInit(): void {
  }

  emitEditMemberDone(value: boolean) {
    this.editMemberDone.emit(value);
  }

}
