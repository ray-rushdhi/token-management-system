import { Component, ViewChild } from '@angular/core';
import { Token } from '../token-management/token';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../patient-manager/patient';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-token-history',
  templateUrl: './token-history.component.html',
  styleUrls: ['./token-history.component.css']
})
export class TokenHistoryComponent {

  patientID?: number;
  patientTokens?: Token[];
  public patients: Patient[] = [];
  dataSource = new MatTableDataSource<Patient>(this.patients);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedPatient: Patient | undefined;

  searchText=""
  currentPatient: Patient = {};
  currentIndex = -1;
  



  constructor(private tokenService: TokenService, private patientService: PatientService) {}
  
  ngOnInit() {
    this.getPatients();
    this.dataSource.data = this.patients;
    this.dataSource.paginator = this.paginator;
    
  }

  FilterChange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patients = response;
        this.dataSource.data = this.patients; 
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  setActivePatient(patient: Patient, index: number): void {
    this.currentPatient = patient;
    this.currentIndex = index;
  }

  getTokensForPatient(): void {

    this.patientID = this.selectedPatient?.id
    if (!this.patientID) {
      return;
    }

    this.tokenService.findByUser(this.patientID).subscribe(tokens => {
      this.patientTokens = tokens;
    });
  }
}
