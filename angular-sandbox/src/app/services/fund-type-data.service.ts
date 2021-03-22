import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FundType } from '../components/models/fund-type';

@Injectable({
  providedIn: 'root',
})
export class FundTypeDataService {
  getFundTypes(): Observable<FundType[]> {
    const fundTypes = [
      { name: 'Money Market' },
      { name: 'Fixed Income' },
      { name: 'Equity' },
      { name: 'Index' },
    ];
    return of(fundTypes);
  }
}
