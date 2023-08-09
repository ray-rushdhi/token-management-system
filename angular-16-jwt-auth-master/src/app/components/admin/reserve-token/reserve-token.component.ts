import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenState } from '../token-management/tokenState.enum';
import { IssueTokenComponent } from '../issue-token/issue-token.component';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

interface DialogData {
  tokenNum: number;
}

@Component({
  selector: 'app-reserve-token',
  templateUrl: './reserve-token.component.html',
  styleUrls: ['./reserve-token.component.css']
})

export class ReserveTokenComponent {

  reservedById: number=0;
  tokenNum: number;

  constructor(
    public dialogRef: MatDialogRef<IssueTokenComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: DialogData,
    private tokenService: TokenService
  ) {
    this.tokenNum = data.tokenNum; // Assign the received tokenNum to the local variable
 
  }


reserveToken(): void {
  if (this.reservedById && this.tokenNum) {
    console.log('Patient ID:', this.reservedById);
    console.log('Token number:', this.tokenNum);

    this.tokenService.reserveTokenAdmin(this.reservedById, this.tokenNum).subscribe(
      (response: string) => { // Change the type to 'string'
        // Assuming the response contains the message "Token reserved successfully"
        console.log('Response:', response); // This will log the response string

        // You can check the response string and take action accordingly
        if (response === 'Token reserved successfully') {
          console.log('Token reserved successfully');
          // Handle the successful response here
        } else {
          console.log('Error in reserving a token');
          // Handle the error response here
        }
      },
      (error: HttpErrorResponse) => { // Use 'HttpErrorResponse' for error handling
        console.log('Error in reserving a token:', error);
        // Handle the error as needed
      }
    );
  } else {
    console.log('Invalid reservedById or tokenNum');
    // Handle the case where reservedById or tokenNum is not valid
  }
}

  
  
  // reserveToken(): void {

  //   console.log('Patient ID:', this.reservedById);
  //   console.log('Token number:', this.tokenNum);
  //   this.tokenService.reserveTokenAdmin(this.reservedById, this.tokenNum).subscribe({
  //     next: data => {
  //       console.log(data);
  //     },
  //     error: () => {
  //       console.log('Error in reserving a token');
  //     }
  //   });

  // }

  
}
