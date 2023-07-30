import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './app-routing.module';
import { EntrepotComponent } from './entrepot/entrepot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {ToastrModule} from "ngx-toastr";
import {AuthGuard} from "@angular/fire/auth-guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    EntrepotComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDfMwCIyqdcHUeUEIZiHXYwCOOL5edfaew",
      authDomain: "entrepot-c5bd3.firebaseapp.com",
      projectId: "entrepot-c5bd3",
      storageBucket: "entrepot-c5bd3.appspot.com",
      messagingSenderId: "663124611974",
      appId: "1:663124611974:web:3ffe0b25ef9bc390515207"
    }),
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,

  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
