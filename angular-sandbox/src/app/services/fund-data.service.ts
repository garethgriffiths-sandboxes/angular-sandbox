import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fund } from '../components/models/fund';

@Injectable({
  providedIn: 'root',
})
export class FundDataService {
  getFunds(): Observable<Fund[]> {
    const funds = [
      { name: 'Hudson ETF', symbol: 'HUETF' },
      { name: 'Fall 500 Index', symbol: 'FAlIN' },
      { name: 'Black Mont Core', symbol: 'BLMC' },
      { name: 'Red Henge Contrafund', symbol: 'RHCF' },
      { name: 'Yellow Street Growth', symbol: 'YSGR' },
      { name: 'Green Crescent Inv', symbol: 'GCINV' },
      { name: 'Winter Stream Trust', symbol: 'WSTRU' },
      { name: 'First Road ETF', symbol: 'FRETF' },
      { name: 'Winter Bay Trust', symbol: 'WBTX' },
      { name: 'Summery View Cash', symbol: 'SVCC' },
      { name: 'Oak City Market', symbol: 'OCMA' },
    ];
    return of(funds);
  }
}
