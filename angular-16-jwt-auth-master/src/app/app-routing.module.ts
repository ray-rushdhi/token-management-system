import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserGuard } from './_helpers/user.guard';
import { PatientManagerComponent } from './components/patient-manager/patient-manager.component';
import { TokenManagementComponent } from './components/token-management/token-management.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { TokenHistoryComponent } from './components/token-history/token-history.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { PatientReserveComponent } from './components/patient-reserve/patient-reserve.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full', },
  { path: 'register', component: RegisterComponent, pathMatch:'full', },
  { path: 'login', component: LoginComponent, pathMatch:'full', },
  { path: 'profile', component: ProfileComponent, pathMatch:'full', },
  {
    path:'admin' ,
    component:SidebarComponent, canActivate: [AuthGuard],

    children:[
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
        path:'token-history',
        component: TokenHistoryComponent
      }
    ],

  },
  {
    path:'user',
    component:UserSidebarComponent, canActivate: [UserGuard],

    children:[
      {
        path:'',
        component: UserDashboardComponent
      },
      {
        path:'patient-history',
        component: PatientHistoryComponent
      },
      {
        path:'patient-reserve',
        component: PatientReserveComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
