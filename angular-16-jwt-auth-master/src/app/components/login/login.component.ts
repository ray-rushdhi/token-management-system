import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoginFailed: boolean | undefined;
  isLoggedIn: boolean | undefined;
  errorMessage: any;

  constructor(private authService: AuthService, 
   private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar,
) { }

  ngOnInit() {

  }

  

  onSubmit() {

    const { username, password } = this.form;
    this.loginService.onLogin(this.form.username, this.form.password).subscribe({
      next: res => {
        console.log('res',res);
        this.loginService.saveTokenAndUser(res.token, res);
        console.log(this.loginService.getToken());
        console.log(this.loginService.getUser())
        
        
        const userRoles = res.roles; 
        if (userRoles.includes('ROLE_ADMIN')) {
  
          this.router.navigate(['admin/patient-manager']);
        } else if(userRoles.includes('ROLE_USER')){

          this.router.navigate(['']);
        }else{
          this.loginService.logout();

        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log('Error!');
        console.log(err);
      }
      
      
  
    
  });
  }

}


  
  
