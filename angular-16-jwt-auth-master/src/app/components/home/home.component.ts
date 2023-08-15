import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInText', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  content?: string;

  constructor(private loginService: LoginService, private router: Router) { }

  isLoggedIn(): boolean {
    
    return this.loginService.isLoggedIn();
    
  }

  isAdmin(): boolean {
    const roles = this.loginService.getUserRoles();
    console.log(roles)
    return roles ? roles.includes('ROLE_ADMIN') : false;
    
  }

  isUser(): boolean {
    const roles = this.loginService.getUserRoles();
    console.log(roles);
    return roles ? roles.includes('ROLE_USER') && !roles.includes('ROLE_ADMIN') : false;
 }

  openReserve() {
    this.router.navigate(['user/patient-reserve']);
  }

  openSignup() {
    this.router.navigate(['register']);
  }

  openLogin() {
    this.router.navigate(['login']);
  }

  // ngOnInit(): void {
  //   this.userService.getPublicContent().subscribe({
  //     next: data => {
  //       this.content = data;
  //     },
  //     error: err => {
  //       if (err.error) {
  //         try {
  //           const res = JSON.parse(err.error);
  //           this.content = res.message;
  //         } catch {
  //           this.content = `Error with status: ${err.status} - ${err.statusText}`;
  //         }
  //       } else {
  //         this.content = `Error with status: ${err.status}`;
  //       }
  //     }
  //   });
  // }
}
