import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http: HttpClient) { }

  onLogin(username: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signin',
    {
      username,
      password,
    })
  }
}
