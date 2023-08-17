import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassChangeRequest } from 'src/app/requests/PassChangeRequest';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  patientID?: number;
  errorMessage = '';
  isFailed: Boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private snack: MatSnackBar) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  ngOnInit(){
    const userDataString = localStorage.getItem('user');

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      this.patientID = userData.id;
    }
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {

      const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const passChangeRequest: PassChangeRequest = {
        patientID: this.patientID!,
        oldPassword: oldPassword,
        newPassword: newPassword
      };

      this.authService.changePassword(passChangeRequest).subscribe({
        next: data => {
          console.log(data);
          this.errorMessage = '';
          this.isFailed = false;
          this.snack.open("Password changed successfully",'Close',{
              duration:4000,
          });
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isFailed = true;
          console.error(err); 
        }
      })
    }
  }

  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordsNotMatch: true };
  }
}
