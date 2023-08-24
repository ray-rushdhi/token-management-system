
import { TokenState } from '../../models/tokenState.enum';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from 'src/app/services/token.service';
import { Patient } from 'src/app/models/patient';
import { TokenImplementation } from 'src/app/models/token';

@Component({
  selector: 'app-reserve-token-admin',
  templateUrl: './reserve-token-admin.component.html',
  styleUrls: ['./reserve-token-admin.component.css']
})
export class ReserveTokenAdminComponent {

  tokenState: TokenState = TokenState.Available;
  token: any;
  selectedTokenState: any;
  selectedDate: string = '';
  reservedByID?: number;

  selectedPatient: Patient | undefined;

  searchText=""

  public patientId: number=0;

  currentPatient: Patient = {};
  currentIndex = -1;

  public patients: Patient[] = [];

  loading = false;


  TokenState: string[] = Object.values(TokenState);

  dataSource = new MatTableDataSource<Patient>(this.patients);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ReserveTokenAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { queryDate: string },
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private snackBar: MatSnackBar ,
    private patientService: PatientService
  ) {
   
    this.selectedDate = data.queryDate || ''; 
  }

  ngOnInit() {
    this.getPatients();
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
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

  setActivePatient(patient: Patient, index: number): void {
    this.currentPatient = patient;
    this.currentIndex = index;
  }

  reserveToken(): void {
    this.loading = true;
    if (this.selectedPatient) {

      console.log("Selected Patient:", this.selectedPatient);

    }
    this.reservedByID = this.selectedPatient?.id;
    console.log("Reserved by ID : ",this.reservedByID)
    console.log(this.selectedDate)
    if (this.reservedByID === undefined) {
      this.snackBar.open('Please fill in all the required fields', 'Close');
      return; 
    }
  
    console.log('Selected Date:', this.selectedDate);
    console.log('Patient ID:', this.reservedByID);
  
  
    const myToken = new TokenImplementation(this.selectedDate,  this.reservedByID);

    console.log(this.selectedDate)
    console.log('Reserved by ID :', this.reservedByID);
  
    this.tokenService.createToken(myToken).subscribe(
      response => {
          console.log(response.body); 
          
          
          const jsonResponse = response.body;
          

          if (jsonResponse && jsonResponse.message === 'Token reserved successfully') {
              this.snackBar.open('Token reserved successfully', 'Close');
              window.location.reload();
          } else {
              console.log('Invalid response format');
              this.snackBar.open('Invalid response format', 'Close');
          }
      },
      error => {
          console.log('Error in reserving a token');
          this.snackBar.open('Error in reserving a token', 'Close');
      }
      
  ).add(() => {
    this.loading = false;
    console.log("Loading stopped")
  });;
  

    if (this.reservedByID) {
      this.dialogRef.close();
    }
  }

  FilterChange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }
  
}


