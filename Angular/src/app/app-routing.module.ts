// import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SineInComponent } from './component/sine-in/sine-in.component';
import { AllTripComponent } from './component/all-trip/all-trip.component';
import { AllTypeOfTripComponent } from './component/all-type-of-trip/all-type-of-trip.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { TripByIdTypeComponent } from './component/trip-by-id-type/trip-by-id-type.component';
import { TripDetailsComponent } from './component/trip-details/trip-details.component';
import { BookingComponent } from './component/booking/booking.component';
import { UserComponent } from './component/user/user.component';
import { AllTripPerUsertComponent } from './component/all-trip-per-usert/all-trip-per-usert.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { TripFilterComponent } from './component/trip-filter/trip-filter.component';
import { BbbbbComponent } from './component/bbbbb/bbbbb.component';
import { AllUserComponent } from './component/all-user/all-user.component';

const routes: Routes = [
  { path: 'HomeSheet', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sinein', component: SineInComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'allTripByIdType/:id', component: TripByIdTypeComponent },
  { path: 'bbb', component: BbbbbComponent },
  { path: 'tripFilter', component: TripFilterComponent },
  { path: 'TripPerUser', component: AllTripPerUsertComponent },

  {
    path: 'allType', component: AllTypeOfTripComponent,
    children: [
    ]
  },

  { path: 'allTrip', component: AllTripComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'TripPerUser', component: AllTripPerUsertComponent },
      { path: 'allUser', component: AllUserComponent },

    ]
  },

  {
    path: 'DetailsTripId/:id', component: TripDetailsComponent,
    children: [
      { path: 'booking/:num', component: BookingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
