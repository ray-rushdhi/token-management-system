import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Token, TokenImplementation } from '../token-management/token';
import { DateAdapter } from '@angular/material/core';
import { DateFilterFn, MatDatepickerInputEvent } from '@angular/material/datepicker';


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
  noDateError?: string;

  loading = false;

  constructor(private tokenService: TokenService, private datePipe: DatePipe,
    private snackBar: MatSnackBar, private dateAdapter: DateAdapter<Date> ){}

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

  checkAvailability() {
    if (!this.selectedDate) {
      this.snackBar.open('Please select a date first', 'Close');
    } else {
      const queryDate: string = this.selectedDate
        ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
        : '';
  
      this.tokenService.findByDate(queryDate).subscribe(
        (response: Token[]) => {
          this.tokens = response;
  
          // Perform availability calculation and other logic here
          this.availability = 20 - this.tokens.length;
          console.log(this.tokens);
          console.log(queryDate);
  
          this.showAvailability = true; // Move this line here if necessary
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


  reserveToken(): void {
    const queryDate: string = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
      : '';
    Swal.fire({
      
      title: `Do you want to reserve a token for ${queryDate} ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        console.log("Loading")

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
        ).add(() => {
          this.loading = false;
          console.log("Loading stopped")
        });
      }
    })
    
    
  }

  
}
