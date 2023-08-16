import { Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from './patient';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PatientService } from 'src/app/services/patient.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-patient-manager',
  templateUrl: './patient-manager.component.html',
  styleUrls: ['./patient-manager.component.css']
})
export class PatientManagerComponent {

  searchText=""

  public patientId: number=0;

  currentPatient: Patient = {};
  currentIndex = -1;

  currentRoles? : string[] | null;

  public patients: Patient[] = [];


  constructor(private patientService: PatientService, private dialog: MatDialog, private loginService: LoginService){}
  
  
  ngOnInit() {
    this.getPatients();
    this.currentRoles = this.loginService.getUserRoles();

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

  setActivePatient(patient: Patient, index: number): void {
    this.currentPatient = patient;
    this.currentIndex = index;
    console.log(patient.roles)
  }

  openPatientDialog(currentPatient: any): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '400px',
      data: {
        patient: currentPatient,
      },
    });
  }

  remove(id: number): void {
    Swal.fire({
      title: 'Do you want to delete the patient?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.deletePatient(id).subscribe(
          () => {
            console.log('Patient removed successfully');
            window.location.reload();
          },
          (error) => {
            console.error('Error removing patient:', error);
          }
        );
      } else if (result.isDenied) {
        console.log('Deletion canceled');
      }
    });
  }

}

  


