import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-create-center-member',
  templateUrl: './create-center-member.component.html',
  styleUrls: ['./create-center-member.component.scss']
})
export class CreateCenterMemberComponent {
  @Output() createDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  emitCreateDone(value: boolean): void {
    this.createDone.emit(value);
  }

  createCenterMember() {
    this.emitCreateDone(true);
  }

}
