import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PatientService } from 'src/app/services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from '../patient-manager/patient';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  patientId: number = 0;
  newUser: any;

  userRoles?: any[];

  constructor(private loginService: LoginService, private router: Router, private patientService: PatientService) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser();
    this.getPatient();
    
  }

  public getPatient(): void {
    this.patientId = this.currentUser.id;
    this.patientService.getPatientById(this.patientId).subscribe(
      (response: Patient) => {
        this.newUser = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  changePassword() {
    this.router.navigate(['user/change-password']);
  }
  
  convertRoleName(role: string): string {

    if (role === 'ROLE_ADMIN') {
      return 'Admin';
    } else if (role === 'ROLE_USER') {
      return 'User';
    } else {
      return role; 
    }
  }
}
