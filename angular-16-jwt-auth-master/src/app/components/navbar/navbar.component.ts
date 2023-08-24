import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Route, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;


  public patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    public loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.loginService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public logout(){
    this.loginService.logout();
    this.router.navigate(['']); 
  }
}
