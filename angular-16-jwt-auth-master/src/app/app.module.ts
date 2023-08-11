import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { UserSidebarComponent } from './components/user/user-sidebar/user-sidebar.component';
import { CustomInterceptor } from './_helpers/custom.interceptor';
import { PatientManagerComponent } from './components/admin/patient-manager/patient-manager.component';
import { DetailsComponent } from './components/admin/details/details.component';
import { EditPatientComponent } from './components/admin/edit-patient/edit-patient.component';
import { TokenManagementComponent } from './components/admin/token-management/token-management.component';
import { AddPatientComponent } from './components/admin/add-patient/add-patient.component';
import { IssueTokenComponent } from './components/admin/issue-token/issue-token.component';
import { ReserveTokenComponent } from './components/admin/reserve-token/reserve-token.component';
import { ReserveTokenAdminComponent } from './components/admin/reserve-token-admin/reserve-token-admin.component';
import { TokenHistoryComponent } from './components/admin/token-history/token-history.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { DetailsDialogComponent } from './components/admin/details-dialog/details-dialog.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { PatientService } from './services/patient.service';
import { TokenService } from './services/token.service';
import { PatientReserveComponent } from './components/user/patient-reserve/patient-reserve.component';
import { PatientHistoryComponent } from './components/user/patient-history/patient-history.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { TokenSortPipe } from './_helpers/token-sort.pipe';
import { SearchPipe } from './_helpers/search.pipe';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    PatientManagerComponent,
    TokenManagementComponent,
    SearchPipe,
    AddPatientComponent, 
    AdminDashboardComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidebarComponent,
    UserSidebarComponent,
    DetailsDialogComponent,
    NavbarComponent,
    TokenHistoryComponent,
    ReserveTokenAdminComponent,
    ReserveTokenComponent,
    IssueTokenComponent,
    EditPatientComponent,
    PatientReserveComponent,
    PatientHistoryComponent,
    UserDashboardComponent,
    TokenSortPipe,
    UnauthorizedComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgxMaskDirective, NgxMaskPipe,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    DatePipe,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true 
    },
    DatePipe,
    TokenSortPipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
