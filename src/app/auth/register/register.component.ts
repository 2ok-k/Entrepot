import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email : string = '';
  password1 : string = '';
  showPassword: boolean = false;
  constructor(private auth : AuthService) {
  }
  ngOnInit() {
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.email == ''){
      alert('Veuillez renseigner un email svp!');
      return;
    }
    if (this.password1 == ''){
      alert('Veuillez renseigner un mot de passe svp!');
      return;
    }
    this.auth.register(this.email,this.password1);
    this.email = '';
    this.password1 = '';
  }
}
