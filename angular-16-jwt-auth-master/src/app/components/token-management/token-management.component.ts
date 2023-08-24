import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReserveTokenAdminComponent } from '../reserve-token-admin/reserve-token-admin.component';
import { TokenSortPipe } from 'src/app/_helpers/token-sort.pipe';
import { TokenService } from 'src/app/services/token.service';
import { PatientService } from 'src/app/services/patient.service';
import { Token } from 'src/app/models/token';


@Component({
  selector: 'app-token-management',
  templateUrl: './token-management.component.html',
  styleUrls: ['./token-management.component.css']
})

export class TokenManagementComponent {

  selectedDate: Date | null = null;

  searchText=""

  currentToken: Token = {};
  currentIndex = -1;
  
  searchQuery: number=0;
  searchResults: Token[] = [];

  availability: number = 0;

  public tokens: any[] = [];

  constructor(private tokenService: TokenService, private dialog: MatDialog, private patientService: PatientService,
    private router: Router, private datePipe: DatePipe, private tokenSortPipe: TokenSortPipe){}
  

  ngOnInit() {
    this.selectedDate = new Date();
    this.onDateChange();

    
  }

  onDateChange(): void {
    this.selectedDate = this.selectedDate ? new Date(this.selectedDate) : null;
    this.getTokens();
    const queryDate: string = this.selectedDate
        ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
        : '';
  
      this.tokenService.findByDate(queryDate).subscribe(
        (response: Token[]) => {
          this.tokens = response;
          this.availability = 20 - this.tokens.length;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getTokens(): void {
    const queryDate: string = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
      : '';

    this.tokenService.findByDate(queryDate).subscribe(
      
      (response: Token[]) => {
        this.tokens = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(queryDate);
  }

  setActiveToken(token: Token, index: number): void {
    this.currentToken = token;
    this.currentIndex = index;
  }

  openDateSelectorDialog(): void {
    const queryDate: string = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!
      : '';
    const dialogRef = this.dialog.open(ReserveTokenAdminComponent, {
      width: '350px',

      data: { queryDate: this.selectedDate },
      
  
    });

    console.log(queryDate);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDate = result;
      }
    });
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

  

  validate(id: number): void {
    Swal.fire({
      title: 'Do you want to validate this token?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.validateToken(id).subscribe(
          () => {
            console.log('Token validated successfully');
            window.location.reload();
          },
          (error) => {
            console.error('Error validating token', error);
          }
        );
      } else if (result.isDenied) {
        console.log('Deletion canceled');
      }
    });
  }

  invalidate(id: number): void {
    Swal.fire({
      title: 'Do you want to invalidate this token?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.invalidateToken(id).subscribe(
          () => {
            console.log('Token invalidated successfully');
            window.location.reload();
          },
          (error) => {
            console.error('Error invalidating token', error);
          }
        );
      } else if (result.isDenied) {
        console.log('Deletion canceled');
      }
    });
  }

  
  }

