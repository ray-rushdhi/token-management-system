import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Token, TokenImplementation } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllTokens(): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiServerUrl}/tokens/all`);
  }

  public findTokenById(tokenNum: number): Observable<Token> {
    return this.http.get<Token>(`${this.apiServerUrl}/tokens/find/${tokenNum}`);
  }


  public createToken(tokenImplementation: TokenImplementation): Observable<HttpResponse<any>> {
    return this.http.post<TokenImplementation>(
      `${this.apiServerUrl}/tokens/reserve`,
      tokenImplementation,
      { observe: 'response' }
    );
  }

  public validateToken(tokenNum: number) {
    return this.http.put<Token>(`${this.apiServerUrl}/tokens/validate/${tokenNum}`, tokenNum)
  }

  public invalidateToken(tokenNum: number) {
    return this.http.put<Token>(`${this.apiServerUrl}/tokens/invalidate/${tokenNum}`, tokenNum)
  }

  public findByDate(date : string): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiServerUrl}/tokens/date/${date}`);
  }

  public findByUser(patientID: number): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiServerUrl}/tokens/user/${patientID}`);
  }

  public reserveToken(patientID: number, date: string) {
    const requestBody = {
      patientID: patientID,
      date: date
    };
    return this.http.post<string>(`${this.apiServerUrl}/tokens/reserve`, requestBody);
  }

  public reserveTokenAdmin(reservedById: number, tokenNum: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, responseType: 'text' as 'json' }; 

    const body = {
      reservedById: reservedById,
      tokenNum: tokenNum
    };

    return this.http.post<string>(`${this.apiServerUrl}/tokens/reserve-admin`, body, options); 
  }

  public deleteToken (tokenNum: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tokens/delete/${tokenNum}`);
  }

  public findAvailability (date: string): Observable<number> {
    return this.http.post<number>(`${this.apiServerUrl}/tokens/availability`, date);
  }

}
