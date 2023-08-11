import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { LoginService } from 'src/app/services/login.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from '../admin/patient-manager/patient';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  patientId: number = 0;
  newUser: any;

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
    // Navigate to the change password page
    this.router.navigate(['user/change-password']);
  }
}
