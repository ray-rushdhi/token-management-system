import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Token, TokenImplementation } from '../../admin/token-management/token';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-reserve',
  templateUrl: './patient-reserve.component.html',
  styleUrls: ['./patient-reserve.component.css']
})
export class PatientReserveComponent {

  selectedDate: string | undefined;
  availableTokens: number | undefined;
  public tokens: any[] = [];
  showAvailability: boolean = false; // Default value is false
  availability: number = 0;
  reservedByID?: number;

  constructor(private tokenService: TokenService, private datePipe: DatePipe,
    private snackBar: MatSnackBar ){}

  ngOnInit() {
    // this.selectedDate = new Date();
    this.onDateChange();
    console.log(this.selectedDate);

    const userDataString = localStorage.getItem('user');

    if (userDataString) {
      // Parse the JSON string into an object
      const userData = JSON.parse(userDataString);

      // Access the user's ID from the parsed object
      this.reservedByID = userData.id;
    }

  }

  onDateChange(): void {
    // Format the selected date and store it in the selectedDay variable
    // this.selectedDate = this.selectedDate ? new Date(this.selectedDate) : null;
    const queryDate: string = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
      : '';
  }

  checkAvailability(){
    const queryDate: string = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
      : '';
      this.tokenService.findByDate(queryDate).subscribe(
      
        (response: Token[]) => {
          this.tokens = response;
          this.showAvailability = true;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.availability = 20 - this.tokens.length;
      console.log(this.tokens);
      console.log(queryDate);
  }

  reserveToken(){

    console.log('Selected Date:', this.selectedDate);
    console.log('Patient ID:', this.reservedByID);
  
  
    const myToken = new TokenImplementation(this.selectedDate,  this.reservedByID);

    console.log(this.selectedDate)
    console.log('Reserved by ID :', this.reservedByID);
  
    this.tokenService.createToken(myToken).subscribe(
      response => {
        if (response.status === 200) {
          this.snackBar.open('Token reserved successfully', 'Close');
        }
      },
      error => {
        console.log('Error in reserving a token');
        this.snackBar.open('Error in reserving a token', 'Close');
      }
    );
  }
}
