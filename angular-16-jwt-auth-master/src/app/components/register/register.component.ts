import { Component, OnInit } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Gender } from '../admin/patient-manager/gender.enum';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  genderOptions: string[] = Object.values(Gender);
  
  form: any = {
    firstName: null,
    lastName: null,
    gender: null,
    dob: null,
    contactNum: null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { firstName, lastName, gender, dob, contactNum,
      username, email, password } = this.form;

    this.authService.register(firstName, lastName, gender, dob, contactNum, username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
