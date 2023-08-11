import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  content?: string;

  constructor(private loginService: LoginService) { }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  isAdmin(): boolean {
    const roles = this.loginService.getUserRoles();
    console.log("The user is an admin")
    return roles ? roles.includes('admin') : false;
    
  }

  isUser(): boolean {
    const roles = this.loginService.getUserRoles();
    console.log("The user is not an admin")
    return roles ? roles.includes('user') : false;
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
