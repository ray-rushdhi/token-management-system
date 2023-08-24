import { Component } from '@angular/core';
import { Token } from 'src/app/models/token';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent {

  patientID?: number;
  patientTokens?: Token[];
  reservedByID?: number;
  searchText=""
  searchQuery: number=0;
  searchResults: Token[] = [];
  public tokens: any[] = [];
  currentIndex = -1;
  currentToken: Token = {};



  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    
    const userDataString = localStorage.getItem('user');

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    this.reservedByID = userData.id; 
  }

  if (!this.reservedByID) {
    return; 
  }

  this.tokenService.findByUser(this.reservedByID).subscribe(tokens => {
    this.patientTokens = tokens;
  });
  }

  setActiveToken(token: Token, index: number): void {
    this.currentToken = token;
    this.currentIndex = index;
  }

  remove(tokenNum: number): void {
    Swal.fire({
      title: 'Do you want to delete this token?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.deleteToken(tokenNum).subscribe(
          () => {
            console.log('Token removed successfully');
            window.location.reload();
          },
          (error) => {
            console.error('Error removing token:', error);
          }
        );
      } else if (result.isDenied) {
        console.log('Deletion canceled');
      }
    });
  }
}
