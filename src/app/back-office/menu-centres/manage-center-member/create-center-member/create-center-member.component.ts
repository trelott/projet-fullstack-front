import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-center-member',
  templateUrl: './create-center-member.component.html',
  styleUrls: ['./create-center-member.component.scss']
})
export class CreateCenterMemberComponent implements OnInit{
  @Output() createDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  createCenterMemberForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.createCenterMemberForm = new FormGroup({
      email: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      role: new FormControl(''),
      center: new FormControl(''),
    });
  }

  emitCreateDone(value: boolean): void {
    this.createDone.emit(value);
  }

  createCenterMember() {
    this.emitCreateDone(true);
  }
}
