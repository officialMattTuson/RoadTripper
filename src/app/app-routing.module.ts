import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarHireComponent } from './pages/car-hire/car-hire.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LodgePackageComponent } from './pages/lodge-package/lodge-package.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent, title: 'Road Tripper' },
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
