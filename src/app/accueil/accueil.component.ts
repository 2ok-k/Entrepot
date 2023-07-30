import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  @Output() isLogout = new EventEmitter<void>()
  constructor(private auth : AuthService,private toastr: ToastrService) {
  }
  ngOnInit() {
    this.toastr.success('Bienvenue sur le dashboard !', 'Succès');
  }

  logout() {
    this.auth.logout()
  }
}
