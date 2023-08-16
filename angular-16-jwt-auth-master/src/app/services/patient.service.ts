import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environment/environment";
import { PassChangeRequest } from "../requests/PassChangeRequest";
import { Patient, PatientUpdateRequest } from "../components/patient-manager/patient";

@Injectable({
    providedIn: 'root'
})


export class PatientService {
    private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}/patients/all`);
  }

  public getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiServerUrl}/patients/find/${patientId}`);
  }

  public addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiServerUrl}/patients/add`, patient);
  }

  public updatePatient(patientUpdate: PatientUpdateRequest): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiServerUrl}/patients/update`, patientUpdate);
  }

  public deletePatient (patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/patients/delete/${patientId}`);
  }

  
}