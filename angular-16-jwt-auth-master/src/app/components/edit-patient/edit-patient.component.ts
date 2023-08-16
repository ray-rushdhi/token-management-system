import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient, PatientUpdateRequest } from '../patient-manager/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender } from '../patient-manager/gender.enum';
import { PatientService } from 'src/app/services/patient.service';

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

  // editPatientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {this.patientId = undefined;}
  // {
  //   this.editPatientForm = this.formBuilder.group({
  //     firstName: [''],
  //     lastName: [''],
  //     gender: [''],
  //     dob: [''],
  //     contactNum: [''],
  //     email: [''],
  //     username: ['']
  //   });

  //   this.pat/ientId = null; // Initialize it as null initially
  // }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.patientId = +idParam;
      console.log("patient ID: ", this.patientId)
      // Fetch patient data using this.patientId and pre-fill the form
      this.fetchPatientData(this.patientId);
    } else {
      // Handle the case where the id parameter is missing
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
        // Handle the error
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

