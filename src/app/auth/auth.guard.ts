import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/*export const authGuard: CanActivateFn = (route, state) => {
  return true;
};*/

@Injectable()
export class AuthGard implements CanActivateFn {
  constructor(private auth:AuthService, private router: Router){}

  canActivate(){
    if(this.auth.IsLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
