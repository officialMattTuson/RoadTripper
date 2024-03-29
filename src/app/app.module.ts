import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CarHireComponent } from './pages/car-hire/car-hire.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LodgePackageComponent } from './pages/lodge-package/lodge-package.component';
import { ServicesComponent } from './pages/services/services.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AvailabilityPopupComponent } from './components/availability-popup/availability-popup.component';
import { BookingConfirmationComponent } from './pages/bookings/booking-confirmation/booking-confirmation.component';
import { BookingRequestComponent } from './pages/bookings/booking-request/booking-request.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { CarCardComponent } from './car-card/car-card.component';
import { BookingFormComponent } from './forms/booking-form/booking-form.component';

@NgModule({
  declarations: [
    AppComponent,

    // Pages
    HomeComponent,
    CarHireComponent,
    LocationsComponent,
    LodgePackageComponent,
    ServicesComponent,

    // Components
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HeroComponent,
    FilterBlockComponent,
    SearchBarComponent,
    AvailabilityPopupComponent,
    BookingRequestComponent,
    BookingConfirmationComponent,
    LocationCardComponent,
    CarCardComponent,
    BookingFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
