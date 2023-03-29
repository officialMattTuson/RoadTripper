import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { catchError, EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  previousUrlString = '';
  currentUrl = window.location.href;
  locations$ = this.appService.getLocations().pipe(
    catchError(error => {
    console.log(error)
    return EMPTY;
  }),
    map(locations => {
      const listOfLocations: string[] = [];
      return locations.map(location => {
        if (listOfLocations.includes(location.country)) {
          return listOfLocations;
        }
        listOfLocations.push(location.country);
        return listOfLocations
      })
    }),
  );

  constructor(public location: Location,
              private appService: AppService) {
  }

}
