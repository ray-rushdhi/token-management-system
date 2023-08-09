import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientManagerComponent } from './components/admin/patient-manager/patient-manager.component';
import { TokenManagementComponent } from './components/admin/token-management/token-management.component';
import { AddPatientComponent } from './components/admin/add-patient/add-patient.component';
import { EditPatientComponent } from './components/admin/edit-patient/edit-patient.component';
import { IssueTokenComponent } from './components/admin/issue-token/issue-token.component';
import { ReserveTokenComponent } from './components/admin/reserve-token/reserve-token.component';
import { TokenHistoryComponent } from './components/admin/token-history/token-history.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full', },
  { path: 'register', component: RegisterComponent, pathMatch:'full', },
  { path: 'login', component: LoginComponent, pathMatch:'full', },
  { path: 'profile', component: ProfileComponent, pathMatch:'full', },
  {
    path:'admin',
    component:SidebarComponent,

    children:[
      {
        path:'',
        component: AdminDashboardComponent
      },
      {
        path:'patient-manager',
        component: PatientManagerComponent
      },
      {
        path:'token-manager',
        component: TokenManagementComponent
      },
      {
        path:'add-patient',
        component: AddPatientComponent
      },
      {
        path:'edit-patient/:id',
        component: EditPatientComponent
      },
      {
        path:'issue-token',
        component: IssueTokenComponent
      },
      {
        path:'reserve-token',
        component: ReserveTokenComponent
      },
      {
        path:'token-history',
        component: TokenHistoryComponent
      }
    ],

  },
  {
    path:'user-dashboard',
    component: UserSidebarComponent
  }
  // { path: 'user', component: BoardUserComponent },
  // { path: 'admin', component: BoardAdminComponent },
  // { path: 'patient-manager', component: PatientManagerComponent},
  // { path: 'token-manager', component: TokenManagementComponent},
  // { path: 'add-patient', component: AddPatientComponent},
  // { path: 'edit-patient/:id', component: EditPatientComponent},
  // { path: 'issue-token', component: IssueTokenComponent},
  // { path: 'reserve-token', component: ReserveTokenComponent},
  // { path: 'token-history', component: TokenHistoryComponent},
  // { path: 'admin-dashboard', component: AdminDashboardComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
