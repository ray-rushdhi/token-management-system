import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../patient-manager/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Route, Router } from '@angular/router';

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

  eventBusSub?: Subscription;

  public patients: Patient[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private patientService: PatientService,
    public loginService: LoginService,
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

  public logout(){
    this.loginService.logout();
    //window.location.reload();
    //this.isLoggedIn=false;
    //this.user=null;
    this.router.navigate(['/login']); // Navigate to the login page after logging out
  }
}
