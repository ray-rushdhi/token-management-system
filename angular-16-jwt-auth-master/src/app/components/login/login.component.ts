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
  // isLoggedIn = false;
  // isLoginFailed = false;
  // errorMessage = '';
  // roles: string[] = [];

  constructor(private authService: AuthService, 
   private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar,
) { }

  ngOnInit() {

  }

  

  onSubmit() {


    // this.loginObj.username = this.form.username;
    // this.loginObj.password = this.form.password;
    const { username, password } = this.form;
    this.loginService.onLogin(this.form.username, this.form.password).subscribe({
      next: res => {
        console.log('res',res);
        this.loginService.saveTokenAndUser(res.token, res);
        console.log(this.loginService.getToken());
        console.log(this.loginService.getUser())
        
        
        const userRoles = res.roles; // Assuming roles are sent in the API response
        if (userRoles.includes('ROLE_ADMIN')) {
          // Redirect to admin dashboard
          // Example: Use Angular Router to navigate to the admin dashboard
          //window.location.href='/admin';
          //this.login.loginStatusSubject.next(true);
          this.router.navigate(['admin/patient-manager']);
        } else if(userRoles.includes('ROLE_USER')){
          // Redirect to user dashboard
          // Example: Use Angular Router to navigate to the user dashboard
          //window.location.href='/user-dashboard';
          //this.login.loginStatusSubject.next(true);
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


  
  
