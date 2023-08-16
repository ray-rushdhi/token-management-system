import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      const user = this.loginService.getUser();
      if (user.roles.includes('ROLE_ADMIN')) {
        return true;
      } else if (user.roles.includes('ROLE_USER')) {
        return true;
      } else {
        this.router.navigate(['']); 
        return false;
      }
    } else {
      this.router.navigate(['login']); 
      return false;
    }
  }
}
