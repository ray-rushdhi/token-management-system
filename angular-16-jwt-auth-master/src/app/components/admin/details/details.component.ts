import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal,{SweetAlertOptions, SweetAlertResult}  from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../patient-manager/patient';
import { PatientService } from '../../../services/patient.service';

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
        // The user confirmed the deletion
        this.patientService.deletePatient(id).subscribe(
          () => {
            console.log('Patient removed successfully');
            window.location.reload();
            // Optionally, you can update the patient list or perform any other actions upon successful removal.
          },
          (error) => {
            console.error('Error removing patient:', error);
            // Handle any error message or error handling logic here.
          }
        );
      } else if (result.isDenied) {
        // The user denied the deletion
        console.log('Deletion canceled');
      }
    });
  }

  editPatient(id: number): void {
    // Navigate to the edit page with the patient ID
    this.router.navigate(['/edit-patient', id]);
  }
}



