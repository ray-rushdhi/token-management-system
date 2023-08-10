import { TokenState } from '../token-management/tokenState.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { Token } from '@angular/compiler';
import { TokenImplementation } from '../token-management/token';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-issue-token',
  templateUrl: './issue-token.component.html',
  styleUrls: ['./issue-token.component.css']
})
export class IssueTokenComponent {

  tokenState: TokenState = TokenState.Available;
  token: any;
  selectedTokenState: any;
  selectedDate: string = '';
  patientID?: number;

  TokenState: string[] = Object.values(TokenState);

  constructor(
    public dialogRef: MatDialogRef<IssueTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private snackBar: MatSnackBar 
  ) {}

  onDateChange() {
    // Format the selected date and store it in the selectedDate variable
    this.selectedDate = this.datePipe.transform(this.data, 'yyyy-MM-dd') || '';
  }

  formatDate(date: Date | null): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }
    return '';
  }

  reserveToken(): void {
    console.log(this.selectedDate)
    if ( !this.selectedTokenState || this.patientID === undefined) {
      this.snackBar.open('Please fill in all the required fields', 'Close'); // Display the error in a snackbar
      return; // Don't proceed if any of the fields are empty
    }
  
    console.log('Selected Date:', this.selectedDate);

    this.selectedDate = this.datePipe.transform(this.data, 'yyyy-MM-dd') || '';
  
    const myToken = new TokenImplementation(this.selectedDate, this.selectedTokenState);
  
    this.tokenService.createToken(myToken).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log('Error in reserving a token');
        this.snackBar.open('Error in reserving a token', 'Close'); // Display the error in a snackbar
      }
      
    });
    location.reload();
  
    // Don't close the dialog if there are validation errors
    if (this.selectedTokenState && this.patientID) {
      this.dialogRef.close();
    }
  }
  
}
