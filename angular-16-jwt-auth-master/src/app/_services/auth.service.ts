import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from '../components/admin/patient-manager/gender.enum';
import { PassChangeRequest } from '../requests/PassChangeRequest';

const AUTH_API = 'http://localhost:8080/api/auth/';
const PATIENTS_API = 'http://localhost:8080/patients/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName: string, lastName: string, gender: Gender,
     dob: string, contactNum: number, username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstName, 
        lastName, 
        gender, 
        dob, 
        contactNum,
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  addPatient(firstName: string, lastName: string, gender: Gender,
    dob: string, contactNum: number, username: string, email: string, password: string): Observable<any> {
   return this.http.post(
     PATIENTS_API + 'add',
     {
       firstName, 
       lastName, 
       gender, 
       dob, 
       contactNum,
       username,
       email,
       password,
     },
     httpOptions
   );
 }

 public removePatient (patientId: number): Observable<void> {
  return this.http.delete<void>(`${PATIENTS_API}/delete/${patientId}`);
}

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  public changePassword(passChangeRequest: PassChangeRequest): Observable<PassChangeRequest> {
    return this.http.post<PassChangeRequest>(`${AUTH_API}change-password`, passChangeRequest);
  }
}
