import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AvailableDate } from '../components/models/available-date';

@Injectable({
  providedIn: 'root',
})
export class AvailableDateDataService {
  getAvailableDates(): Observable<AvailableDate[]> {
    const dates = [
      { date: new Date('2019-01-16') },
      { date: new Date('2016-05-23') },
      { date: new Date('2015-07-09') },
      { date: new Date('2014-07-07') },
    ];
    return of(dates);
  }
}
