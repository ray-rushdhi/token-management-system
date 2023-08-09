import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from './patient';
import { PatientService } from '../../../services/patient.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  public patients: Patient[] = [];

  constructor(private patientService: PatientService, private dialog: MatDialog){}
  
  

  ngOnInit() {
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

  setActivePatient(patient: Patient, index: number): void {
    this.currentPatient = patient;
    this.currentIndex = index;
  }

  // showPatientDetails( patient: any, index: number) {
  //   this.currentIndex = index;
  //   this.currentPatient = patient;
  // }

  openPatientDialog(currentPatient: any): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '400px',
      data: {
        patient: currentPatient,
        // onEdit: (id: string) => this.editPatient(id),
        // onRemove: (id: string) => this.remove(id),
      },
    });
  }

    
  }

  // confirmDeletePatient(patientId: number): void {
  //   if (this.patientId !== null) {
  //     const confirmation = window.confirm(`Are you sure you want to delete this patient?`);
  //     if (confirmation) {
  //       this.deletePatient(this.patientId);
  //     }
  //   }
  // }

  // deletePatient(patientId: number): void {
  //   this.patientService.deletePatient(patientId).subscribe(
  //     () => {
  //       // Reload the patients list after successful deletion
  //       this.getPatients();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(`Failed to delete patient. Error: ${error.message}`);
  //     }
  //   );
  // }
  


  // public onOpenModal(patient: Patient, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if(mode === 'add') {
  //     button.setAttribute('data-target', '#addPatientModal');
  //   }
  //   if(mode === 'edit') {
  //     button.setAttribute('data-target', '#updatePatientModal');
  //   }
  //   if(mode === 'delete') {
  //     button.setAttribute('data-target', '#deletePatientModal');
  //   }
  //   container?.appendChild(button);
  //   button.click();
  


