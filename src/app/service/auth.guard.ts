import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.tokenStorageService.getRole()[0];
    if (role) {
      if (next.data.roles.indexOf(role) === -1) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}
