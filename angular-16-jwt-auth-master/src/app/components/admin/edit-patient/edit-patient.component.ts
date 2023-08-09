import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient, PatientUpdateRequest } from '../patient-manager/patient';
import { PatientService } from '../../../services/patient.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender } from '../patient-manager/gender.enum';

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
    } else {
      // Handle the case where the id parameter is missing
    }
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
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      })
    }
}

