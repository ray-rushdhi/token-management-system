import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(username: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signin',
    {
      username,
      password,
    },
    httpOptions)
  }

  public saveTokenAndUser(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUser() {
    let userString = localStorage.getItem('user');
    //return userString ? JSON.parse(userString) : null;

    //let userStr = localStorage.getItem("user");
    if(userString!=null)
    {
        return JSON.parse(userString);
    }else{
      this.logout();
      return null;
    }
  }

  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    //this.loginStatusSubject.next(true);
    if(tokenStr==undefined || tokenStr == '' || tokenStr == null)
    {
      return false;
    }else{
      return true;
    }
   }

  // Clear token and user details from local storage on logout
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getUserRoles(): string[] | null {
    const user = this.getUser();
    return user ? user.roles : null;
  }


}
