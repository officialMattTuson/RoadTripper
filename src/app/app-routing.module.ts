import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarHireComponent } from './pages/car-hire/car-hire.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LodgePackageComponent } from './pages/lodge-package/lodge-package.component';
import { ServicesComponent } from './pages/services/services.component';
import { BookingRequestComponent } from './pages/bookings/booking-request/booking-request.component';
import { BookingConfirmationComponent } from './pages/bookings/booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent, title: 'Road Tripper' },
  { path: 'booking', component: BookingRequestComponent, title: 'Booking Request' },
  { path: 'booking/:id', component: BookingConfirmationComponent, title: 'Booking Confirmation' },
  { path: 'car-hire', component: CarHireComponent, title: 'Our Fleet' },
  { path: 'locations', component: LocationsComponent, title: 'Locations' },
  { path: 'lodge-package', component: LodgePackageComponent, title: 'Lodge Packages' },
  { path: 'services', component: ServicesComponent, title: 'Other Services' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
