import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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

  logout(): void {

  }

  openPatientManager() {
    this.router.navigate(['admin/patient-manager']);
  }

  openTokenManager() {
    this.router.navigate(['admin/token-manager']);
  }

  openTokenHistory() {
    this.router.navigate(['admin/token-history']);
  }


}
