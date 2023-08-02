import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EntrepotComponent} from "./entrepot/entrepot.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {canActivate} from "@angular/fire/compat/auth-guard";
import {AuthGuard} from "@angular/fire/auth-guard";
import {AuthGuardGuard} from "./auth/authGuard.guard";


const routes:Routes = [
  //{path: '', redirectTo:"login", pathMatch: "full"},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  /*{path:"entrepot", component: EntrepotComponent},
  {path:"dashboard", component: DashboardComponent},*/
  {path:"accueil", component: AccueilComponent,canActivate: [AuthGuardGuard], children: [
      { path: '', redirectTo: 'entrepot', pathMatch: 'full' },
      {path:"entrepot", component: EntrepotComponent},
      {path:"dashboard", component: DashboardComponent}
      //{path:"dashboard", component: DashboardComponent,canActivate: [AuthGuardGuard]}
  ]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
