import { Component, OnInit } from '@angular/core';
import { Gender } from '../../models/gender.enum';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


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
    password: null,
    confirmPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit(): void {
    const { firstName, lastName, gender, dob, contactNum,
      username, email, password, confirmPassword } = this.form;

      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        this.isSignUpFailed = true;
        return;
      }

    this.authService.register(firstName, lastName, gender, dob, contactNum, username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.snackBar.open('Registration successful', 'Close', {
          duration: 3000, 
        });
        this.router.navigate(['login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
