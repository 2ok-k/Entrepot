import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email : string = '';
  password1 : string = '';
  errorMessage: string = '';


/*  hide: boolean = true;
  passwordControl:FormControl = new FormControl('',Validators.required);
  loginForm : FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  })*/

  constructor(private auth: AuthService,private router :Router) {
  }
  ngOnInit() {
  }
  login(){
    if (this.email == ''){
      this.errorMessage = 'Veuillez renseigner un email svp!';
      return;
    }
    if (this.password1 == ''){
      this.errorMessage = 'Veuillez renseigner un mot de passe svp!';
      return;
    }
    this.auth.login(this.email,this.password1);
    this.email = '';
    this.password1 = '';
  }

}
