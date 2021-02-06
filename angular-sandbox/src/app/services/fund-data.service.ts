import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { Fund } from '../models/fund';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class FundDataService {

  private fundsUrl = 'api/Funds';

  constructor(private httpClient: HttpClient) { }

  getFunds(): Observable<Fund[]> {
    var funds = [
      new Fund({ name: 'Hudson ETF', symbol: 'HUETF' }),
      new Fund({ name: 'Fall 500 Index', symbol: 'FAlIN' }),
      new Fund({ name: 'Black Mont Core', symbol: 'BLMC' }),
      new Fund({ name: 'Red Henge Contrafund', symbol: 'RHCF' }),
      new Fund({ name: 'Yellow Street Growth', symbol: 'YSGR' }),
      new Fund({ name: 'Green Crescent Inv', symbol: 'GCINV' }),
      new Fund({ name: 'Winter Stream Trust', symbol: 'WSTRU' }),
      new Fund({ name: 'First Road ETF', symbol: 'FRETF' }),
      new Fund({ name: 'Winter Bay Trust', symbol: 'WBTX' }),
      new Fund({ name: 'Summery View Cash', symbol: 'SVCC' }),
      new Fund({ name: 'Oak City Market', symbol: 'OCMA' })
    ];
    return of(funds);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation}: ${error}`);

      return of(result as T);
    };
  }
}
