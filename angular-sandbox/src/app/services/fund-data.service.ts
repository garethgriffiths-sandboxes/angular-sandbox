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
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''}),
      new Fund({name: '', symbol: ''})
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
