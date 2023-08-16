import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../patient-manager/patient';
import { PatientService } from 'src/app/services/patient.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;


  public patients: Patient[] = [];

  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
  

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



  openReserve() {
    this.router.navigate(['user/patient-reserve']);
  }

  openHistory() {
    this.router.navigate(['user/patient-history']);
  }

}
