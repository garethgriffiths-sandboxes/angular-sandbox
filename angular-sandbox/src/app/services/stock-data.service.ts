import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { Stock } from '../models/stock';
import { StockMarket } from '../models/stock-market';
import { StockPrice } from '../models/stock-price';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class StockDataService {

  private stocksUrl = 'api/Stocks';

  constructor(private httpClient: HttpClient) { }

  getStockMarkets(): Observable<StockMarket[]> {
    const getStockMarketsUrl = `${API_URL}/${this.stocksUrl}/exchanges`;
    //return this.httpClient
     // .get<StockMarket[]>(getStockMarketsUrl)
      //.pipe(
       // catchError(this.handleError('getStockMarkets', []))
     // );

      return new Observable<StockMarket[]>();
  }

  getStocksByStockMarkets(stockMarkets: StockMarket[]): Observable<Stock[]> {
    const getStocksByStockMarketUrl = `${API_URL}/${this.stocksUrl}`;

    return from(stockMarkets)
      .pipe(
        concatMap(stockMarket => <Observable<Stock[]>>this.httpClient.get(`${getStocksByStockMarketUrl}/?stockExchange=${stockMarket}`).pipe(
          catchError(this.handleError(`getStocksByStockMarkets stockExchange=${stockMarket}`, []))
        ))
      );
  }

  getStockHistoryByStockSymbol(stockSymbol: string): Observable<StockPrice[]> {
    const getStockHistoryByStockSymbolUrl = `${API_URL}/${this.stocksUrl}/${stockSymbol}/history`;

    return this.httpClient
      .get<StockPrice[]>(getStockHistoryByStockSymbolUrl)
      .pipe(
        catchError(this.handleError(`getStockHistoryByStockSymbol stockSymbol=${stockSymbol}`, []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation}: ${error}`);

      return of(result as T);
    };
  }
}
