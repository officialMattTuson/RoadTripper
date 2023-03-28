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
import { LearningComponent } from './pages/lodge-package/learning/learning.component';
import { SearhBarComponent } from './components/searh-bar/searh-bar.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';


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
    LearningComponent,
    SearhBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
