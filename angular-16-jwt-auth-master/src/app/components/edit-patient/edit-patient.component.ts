import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender } from '../../models/gender.enum';
import { PatientService } from 'src/app/services/patient.service';
import { Patient, PatientUpdateRequest } from 'src/app/models/patient';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css'],
})
export class EditPatientComponent implements OnInit {

  genderOptions: string[] = Object.values(Gender);
  
  patientUpdate? : PatientUpdateRequest;

  form: any = {
    firstName: null,
    lastName: null,
    gender: null,
    dob: null,
    contactNum: null,
    username: null,
    email: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  patientId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {this.patientId = undefined;}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.patientId = +idParam;
      console.log("patient ID: ", this.patientId)
      this.fetchPatientData(this.patientId);
    } else {
    }
  }

  fetchPatientData(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe(
    
      (patient: Patient) => {
        this.form = {
          firstName: patient.firstName,
          lastName: patient.lastName,
          gender: patient.gender,
          dob: patient.dob,
          contactNum: patient.contactNum,
          username: patient.username,
          email: patient.email,
        };
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  onSubmit() {

    const { firstName, lastName, gender, dob, contactNum,
      username, email } = this.form;

      
      this.patientUpdate = new PatientUpdateRequest(this.patientId, firstName, lastName, gender, dob, contactNum, email, username);

      this.patientService.updatePatient(this.patientUpdate).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'An error occurred while updating the patient.';
          }
          this.isSignUpFailed = true;
        }
      })
    }
}

