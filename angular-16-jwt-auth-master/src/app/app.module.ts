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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomInterceptor } from './_helpers/custom.interceptor';

import { AddPatientComponent } from './components/add-patient/add-patient.component';

import { TokenSortPipe } from './_helpers/token-sort.pipe';
import { SearchPipe } from './_helpers/search.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TokenManagementComponent } from './components/token-management/token-management.component';
import { DetailsComponent } from './components/details/details.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenHistoryComponent } from './components/token-history/token-history.component';
import { ReserveTokenAdminComponent } from './components/reserve-token-admin/reserve-token-admin.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { PatientReserveComponent } from './components/patient-reserve/patient-reserve.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PatientManagerComponent } from './components/patient-manager/patient-manager.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientManagerComponent,
    TokenManagementComponent,
    SearchPipe,
    AddPatientComponent, 
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
    EditPatientComponent,
    PatientReserveComponent,
    PatientHistoryComponent,
    UserDashboardComponent,
    TokenSortPipe,
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
    MatTableModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
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
