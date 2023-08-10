import { Component, ViewChild } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { Token } from '../token-management/token';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../patient-manager/patient';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';

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



  constructor(private tokenService: TokenService, private patientService: PatientService) {}
  
  ngOnInit() {
    this.getPatients();
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patients = response;
        this.dataSource.data = this.patients; // Update the data source
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
