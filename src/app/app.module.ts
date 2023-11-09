import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './front-office/vaccination-center/vaccination-center.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { VaccinationCenterListComponent } from './front-office/vaccination-center-list/vaccination-center-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppointmentComponent } from './front-office/appointment/appointment.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { MenuCentresComponent } from './back-office/menu-centres/menu-centres.component';
import { MenuMonCentreComponent } from './back-office/menu-mon-centre/menu-mon-centre.component';
import { MenuPlanningComponent } from './back-office/menu-planning/menu-planning.component';
import { MenuConfigComponent } from './back-office/menu-config/menu-config.component';
import {TokenInterceptorService} from "./interceptors/token-interceptor.service";
import { EditCentreComponent } from './back-office/menu-centres/edit-centre/edit-centre.component';
import { CreateCentreComponent } from './back-office/menu-centres/create-centre/create-centre.component';

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
    MenuConfigComponent,
    EditCentreComponent,
    CreateCentreComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
