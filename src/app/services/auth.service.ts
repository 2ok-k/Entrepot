import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {catchError, from, map, Observable, throwError} from "rxjs";

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

  getUserEmail(): Observable<string | null> {
    // @ts-ignore
    return this.fireAuth.authState.pipe(map(user => user?.email));
  }
  //Méthode de connexion
  // @ts-ignore
  login(email : string , password : string): Observable<any>{
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(() => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['accueil/entrepot']);
        return {};
      }),
      catchError(err => {
        return throwError('Email ou mot de passe incorrect!');
      })
    );
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
