import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  @Output() isLogout = new EventEmitter<void>();

  userEmail!: string | null;
  constructor(private auth : AuthService,private toastr: ToastrService) {
  }
  ngOnInit() {
    this.auth.getUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  logout() {
    this.auth.logout()
  }
}
