import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/_services/account-service.service';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
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
    private storageService: StorageService,
    private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar,
) { }

  ngOnInit(): void {
    // if (this.storageService.isLoggedIn()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.storageService.getUser().roles;
    // }
  }

  // loginObj: any = {
  //   username: '',
  //   password: ''
  // };

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
          this.router.navigate(['admin']);
        } else if(userRoles.includes('ROLE_USER')){
          // Redirect to user dashboard
          // Example: Use Angular Router to navigate to the user dashboard
          //window.location.href='/user-dashboard';
          //this.login.loginStatusSubject.next(true);
          this.router.navigate(['user']);
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
      
      
    

      // (res: any) => {
      //   console.log('res',res);
      //   this.loginService.saveTokenAndUser(res.token, res);
      //   console.log(this.loginService.getToken);
      //   console.log(this.loginService.getUser)
        
        
      //   const userRoles = res.roles; // Assuming roles are sent in the API response
      //   if (userRoles.includes('ROLE_ADMIN')) {
      //     // Redirect to admin dashboard
      //     // Example: Use Angular Router to navigate to the admin dashboard
      //     //window.location.href='/admin';
      //     //this.login.loginStatusSubject.next(true);
      //     this.router.navigate(['admin']);
      //   } else if(userRoles.includes('ROLE_USER')){
      //     // Redirect to user dashboard
      //     // Example: Use Angular Router to navigate to the user dashboard
      //     //window.location.href='/user-dashboard';
      //     //this.login.loginStatusSubject.next(true);
      //     this.router.navigate(['user-dashboard']);
      //   }else{
      //     this.loginService.logout();

      //   }
          
      // },
      // (err) => {
      //   this.errorMessage = err.error.message;
      //   this.isLoginFailed = true;
      //   console.log('Error!');
      //   console.log(err);
      //   // this.snack.open("Invalid Details!!! Try again",'',{
      //   //   duration:3000,
      //   // });
      // }
    
  });
  }

}


  




    // const { username, password } = this.form;

    // this.authService.login(username, password).subscribe({
    //   next: (data: any) => {
    //     this.storageService.saveUser(data);
    //     this.storageService.saveToken(data.accessToken);
    //     // console.log(data.accessToken);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.storageService.getUser().roles;
    //     this.reloadPage();
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // });
  
