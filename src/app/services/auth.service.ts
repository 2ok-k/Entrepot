import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private errorMessage = '';
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
  getErrorMessage(): string {
    return this.errorMessage;
  }


  ngOnInit() {
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    //private toastr: ToastrService
  ) { }

  //Méthode de connexion
  login(email : string , password : string){
    this.fireAuth.signInWithEmailAndPassword(email,password)
      .then(() => {
          localStorage.setItem('token','true');
          this.router.navigate(['accueil/entrepot']);
          //this.toastr.success('Connexion réussie !', 'Bienvenue');
      },err =>{
          //alert('Email ou mot de passe incorrect!');
         alert(err.message);
         this.router.navigate(['/login']);
      })
  }


  //Méthode d'inscription
  register(email : string , password : string ){
    this.fireAuth.createUserWithEmailAndPassword(email,password)
      .then(() => {
        alert('Inscription effectué avec succès !');
        this.router.navigate(['/login']);
      },err =>{
        alert(err.message);
        this.router.navigate(['/register']);
      })
  }


  //Méthode de déconnexion
  logout(){
    this.fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },err =>{
        alert(err.message);
      }
    )
  }

  IsLoggedIn(){
    const isLoggedIn = !!localStorage.getItem('token');
    console.log('IsLoggedIn:', isLoggedIn);
    return isLoggedIn;
  }
}
