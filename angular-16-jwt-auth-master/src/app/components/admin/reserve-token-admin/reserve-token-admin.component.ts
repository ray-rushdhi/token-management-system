
import { TokenState } from '../token-management/tokenState.enum';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { TokenImplementation } from '../token-management/token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserve-token-admin',
  templateUrl: './reserve-token-admin.component.html',
  styleUrls: ['./reserve-token-admin.component.css']
})
export class ReserveTokenAdminComponent {

  tokenNumber?: number;
  tokenState: TokenState = TokenState.Available;
  token: any;
  selectedTokenState: any;
  selectedDate: string = '';
  reservedByID?: number;

  TokenState: string[] = Object.values(TokenState);

  constructor(
    public dialogRef: MatDialogRef<ReserveTokenAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { queryDate: string },
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private snackBar: MatSnackBar 
  ) {
   
    this.selectedDate = data.queryDate || ''; // Assign selected date from the passed data
  }

  reserveToken(): void {
    console.log(this.selectedDate)
    if (this.tokenNumber === undefined || this.reservedByID === undefined) {
      this.snackBar.open('Please fill in all the required fields', 'Close'); // Display the error in a snackbar
      return; // Don't proceed if any of the fields are empty
    }
  
    console.log('Selected Date:', this.selectedDate);
    console.log('Token number:', this.tokenNumber);
    console.log('Patient ID:', this.reservedByID);
  
  
    const myToken = new TokenImplementation(this.tokenNumber, this.selectedDate,  this.reservedByID);

    console.log(this.selectedDate)
    console.log('Reserved by ID :', this.reservedByID);
  
    this.tokenService.createToken(myToken).subscribe(
      response => {
        if (response.status === 200) {
          this.snackBar.open('Token reserved successfully', 'Close');
          window.location.reload();
        }
      },
      error => {
        console.log('Error in reserving a token');
        this.snackBar.open('Error in reserving a token', 'Close');
      }
    );
  
    // Don't close the dialog if there are validation errors
    if (this.tokenNumber  && this.reservedByID) {
      this.dialogRef.close();
    }
  }

}


