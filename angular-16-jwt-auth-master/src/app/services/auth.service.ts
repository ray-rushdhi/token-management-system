import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PassChangeRequest } from '../requests/PassChangeRequest';
import { Gender } from '../models/gender.enum';
import { environment } from '../environment/environment';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(firstName: string, lastName: string, gender: Gender,
     dob: string, contactNum: number, username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiServerUrl}/auth/signup`,
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

  public changePassword(passChangeRequest: PassChangeRequest): Observable<PassChangeRequest> {
    return this.http.post<PassChangeRequest>(`${this.apiServerUrl}/auth/change-password`, passChangeRequest);
  }
}
