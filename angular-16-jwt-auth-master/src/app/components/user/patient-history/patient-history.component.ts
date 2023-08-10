import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Token } from '../../admin/token-management/token';

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
    this.reservedByID = userData.id; // Assign user's ID
  }

  // Fetch tokens for the logged-in patient
  if (!this.reservedByID) {
    return; // If reservedByID is not available, exit the function
  }

  this.tokenService.findByUser(this.reservedByID).subscribe(tokens => {
    this.patientTokens = tokens;
  });
  }

  setActiveToken(token: Token, index: number): void {
    this.currentToken = token;
    this.currentIndex = index;
  }

  // getTokensForPatient(): void {
  //   if (!this.patientID) {
  //     return;
  //   }

  //   this.tokenService.findByUser(this.patientID).subscribe(tokens => {
  //     this.patientTokens = tokens;
  //   });
  // }
}
