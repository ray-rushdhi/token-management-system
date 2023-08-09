import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  private apiUrl = 'http://localhost:8080/api/test/admin';
  adminData: any;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.getAdminData();
    // this.userService.getAdminBoard().subscribe({
    //   next: data => {
    //     this.content = data;
    //   },
    //   error: err => {
    //     if (err.error) {
    //       try {
    //         const res = JSON.parse(err.error);
    //         this.content = res.message;
    //       } catch {
    //         this.content = `Error with status: ${err.status} - ${err.statusText}`;
    //       }
    //     } else {
    //       this.content = `Error with status: ${err.status}`;
    //     }
    //   }
    // });
  }

  getAdminData(): void {
    const token = localStorage.getItem('authToken'); // Replace with the name of your stored token key
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(this.apiUrl, { headers }).subscribe(
      (response) => {
        this.adminData = response;
      },
      (error) => {
        console.error('Failed to fetch admin data:', error);
      }
    );
  }
}
