import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VaccinationCenter} from "../../interfaces/vaccination-center";
import {ActivatedRoute} from "@angular/router";
import {VaccinationService} from "../../services/vaccination.service";

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit {

  @Input() center?: VaccinationCenter;
  @Output() deleted = new EventEmitter<VaccinationCenter>();

  constructor(
    private route: ActivatedRoute,
    private vaccinationService: VaccinationService,
  ) {}
  public clearName(): void {
    this.center!.name=""
  }

  public deleteCenter() {
    this.deleted.emit(this.center);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.vaccinationService.getVaccinationCenterById(id)?.subscribe(
      resultCenter => this.center = resultCenter
    )
  }

  selectCenter() {
    return;
  }
}
