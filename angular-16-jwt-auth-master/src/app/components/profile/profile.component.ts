import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser();
  }
  changePassword() {
    // Navigate to the change password page
    this.router.navigate(['user/change-password']);
  }
}
