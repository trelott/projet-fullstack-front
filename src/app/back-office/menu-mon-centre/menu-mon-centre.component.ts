import {Component, Input, OnInit} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-menu-mon-centre',
  templateUrl: './menu-mon-centre.component.html',
  styleUrls: ['./menu-mon-centre.component.scss']
})
export class MenuMonCentreComponent implements OnInit{
  @Input() center!: VaccinationCenter;
  modifyCenterMember?: User;
  constructor(

  ) {}

  ngOnInit(): void {
  }

  setModifyCenterMember(centerMember?: User) {
    this.modifyCenterMember = centerMember;
  }
}
