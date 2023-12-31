import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      const user = this.loginService.getUser();
      if (user && user.roles.includes('ROLE_ADMIN')) {
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
