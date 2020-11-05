import { Component, OnInit } from '@angular/core';

import { StockDataService } from '../../services/stock-data.service';
import { StockHistoryService } from '../../services/stock-history.service';

import { Stock } from '../../models/stock'
import { StockMarket } from '../../models/stock-market'

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.min.css']
})

export class StockListComponent implements OnInit {
  stocks: Stock[];
  selectedStock: Stock;

  constructor(
    private stockDataService: StockDataService,
    private stockHistoryService: StockHistoryService) { }

  ngOnInit() {
    this.stockHistoryService.stockMarketsChange.subscribe(stockMarkets => {
      this.stocks = [];
      this.getStocksByStockMarkets(stockMarkets);
    });
  }

  onItemClick(event, item) {
    this.selectedStock = item;
    this.stockHistoryService.setSelectedStock(this.selectedStock);
  }

  getStocksByStockMarkets(stockMarkets: StockMarket[]): void {
    this.stockDataService.getStocksByStockMarkets(stockMarkets)
      .subscribe(stocks => this.stocks = stocks);
  }
}
