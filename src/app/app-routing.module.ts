import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {FrontOfficeComponent} from "./front-office/front-office.component";
import {BackOfficeComponent} from "./back-office/back-office.component";

const routes: Routes = [
  { path: "back", component: BackOfficeComponent},
  { path: "auth", component: AuthComponent},
  { path: "front", component: FrontOfficeComponent},
  { path: "", redirectTo: "/front", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
