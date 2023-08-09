import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../admin/patient-manager/patient';
import { PatientService } from '../../services/patient.service';

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

  eventBusSub?: Subscription;

  public patients: Patient[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');


      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.getPatients();
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
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
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
