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

  getFundMarkets(): Observable<Fund[]> {
    const getFundMarketsUrl = `${API_URL}/${this.fundsUrl}/exchanges`;
    //return this.httpClient
     // .get<FundMarket[]>(getFundMarketsUrl)
      //.pipe(
       // catchError(this.handleError('getFundMarkets', []))
     // );

      return new Observable<Fund[]>();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation}: ${error}`);

      return of(result as T);
    };
  }
}
