import { Component } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { Token } from '../token-management/token';

@Component({
  selector: 'app-token-history',
  templateUrl: './token-history.component.html',
  styleUrls: ['./token-history.component.css']
})
export class TokenHistoryComponent {

  patientID?: number;
  patientTokens?: Token[];

  constructor(private tokenService: TokenService) {}

  getTokensForPatient(): void {
    if (!this.patientID) {
      return;
    }

    this.tokenService.findByUser(this.patientID).subscribe(tokens => {
      this.patientTokens = tokens;
    });
  }
}
