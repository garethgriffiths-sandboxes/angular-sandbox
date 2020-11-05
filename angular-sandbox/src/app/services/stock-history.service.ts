import { Injectable, Output, EventEmitter } from '@angular/core'
import { StockMarket } from '../models/stock-market';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})

export class StockHistoryService {

  @Output() stockMarketsChange: EventEmitter<StockMarket[]> = new EventEmitter();
  @Output() stockChange: EventEmitter<Stock> = new EventEmitter();

  setSelectedStockMarkets(stockMarkets: StockMarket[]) {
    this.stockMarketsChange.emit(stockMarkets);
  }

  setSelectedStock(stock: Stock) {
    this.stockChange.emit(stock);
  }
}
