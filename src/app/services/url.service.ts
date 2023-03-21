import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  arrayOfPreviousUrls: string[] = [];
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  setPreviousUrl(previousUrl: string) {
    if (!previousUrl) {
      previousUrl = '/apf';
    }
    this.previousUrl.next(previousUrl);
    this.arrayOfPreviousUrls.push(previousUrl);
  }
}
