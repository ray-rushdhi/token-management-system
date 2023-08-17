import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Patient } from '../patient-manager/patient';
import { PatientService } from 'src/app/services/patient.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  @Input() viewMode = false;

  @Input() currentPatient: Patient = {
    id: 0,
    firstName: "",
    lastName: "",
    gender: undefined,
    dob: undefined,
    contactNum: 0,
    username: "",
    email: "",
    password: "",
    roles: undefined
  };

  message = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPatient(this.route.snapshot.params['id']);
    }
  }

  getPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        this.currentPatient = data;
        console.log(data);
      },
      error: (e) => console.error(e)
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

  editPatient(id: number): void {
    this.router.navigate(['/edit-patient', id]);
  }
}



