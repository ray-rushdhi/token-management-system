
import { TokenState } from '../token-management/tokenState.enum';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { TokenImplementation } from '../token-management/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../patient-manager/patient';
import { PatientService } from 'src/app/services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
   
    this.selectedDate = data.queryDate || ''; // Assign selected date from the passed data
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
        this.dataSource.data = this.patients; // Update the data source
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
    if (this.selectedPatient) {
      // Use this.selectedPatient data to perform the reservation logic
      console.log("Selected Patient:", this.selectedPatient);
      // ... Other reservation logic ...
    }
    this.reservedByID = this.selectedPatient?.id;
    console.log("Reserved by ID : ",this.reservedByID)
    console.log(this.selectedDate)
    if (this.reservedByID === undefined) {
      this.snackBar.open('Please fill in all the required fields', 'Close'); // Display the error in a snackbar
      return; // Don't proceed if any of the fields are empty
    }
  
    console.log('Selected Date:', this.selectedDate);
    console.log('Patient ID:', this.reservedByID);
  
  
    const myToken = new TokenImplementation(this.selectedDate,  this.reservedByID);

    console.log(this.selectedDate)
    console.log('Reserved by ID :', this.reservedByID);
  
    this.tokenService.createToken(myToken).subscribe(
      response => {
          console.log(response.body); // Check the response in the console
          
          // Parse the JSON response
          const jsonResponse = response.body;
          
          // Check the message property in the JSON response
          if (jsonResponse && jsonResponse.message === 'Token reserved successfully') {
              this.snackBar.open('Token reserved successfully', 'Close');
          } else {
              console.log('Invalid response format');
              this.snackBar.open('Invalid response format', 'Close');
          }
      },
      error => {
          console.log('Error in reserving a token');
          this.snackBar.open('Error in reserving a token', 'Close');
      }
  );
  
    // Don't close the dialog if there are validation errors
    if (this.reservedByID) {
      this.dialogRef.close();
    }
  }

  FilterChange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }
  
}


