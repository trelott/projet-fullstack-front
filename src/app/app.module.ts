import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import {HttpClientModule} from "@angular/common/http";
import { AppointmentComponent } from './appointment/appointment.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { MenuCentresComponent } from './menu-centres/menu-centres.component';
import { MenuMonCentreComponent } from './menu-mon-centre/menu-mon-centre.component';
import { MenuPlanningComponent } from './menu-planning/menu-planning.component';
import { MenuConfigComponent } from './menu-config/menu-config.component';

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterComponent,
    VaccinationCenterListComponent,
    AppointmentComponent,
    AuthComponent,
    HeaderComponent,
    FrontOfficeComponent,
    BackOfficeComponent,
    MenuCentresComponent,
    MenuMonCentreComponent,
    MenuPlanningComponent,
    MenuConfigComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
