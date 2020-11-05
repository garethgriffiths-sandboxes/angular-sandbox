import { Component, OnInit } from '@angular/core';

import { StockDataService } from '../../services/stock-data.service';
import { StockHistoryService } from '../../services/stock-history.service';

import { StockPrice } from '../../models/stock-price'
import { Stock } from '../../models/stock';

@Component({
  selector: 'stock-price-list',
  templateUrl: './stock-price-list.component.html',
  styleUrls: ['./stock-price-list.component.min.css']
})

export class StockPriceListComponent implements OnInit {
  constructor(
    private stockDataService: StockDataService,
    private stockHistoryService: StockHistoryService) { }

  selectedStock: Stock;
  stockPrices: StockPrice[];

  ngOnInit() {
    this.stockHistoryService.stockMarketsChange.subscribe(() => {
      this.selectedStock = null;
      this.stockPrices = null;
    });

    this.stockHistoryService.stockChange.subscribe(stock => {
      this.selectedStock = stock;
      this.getStockHistoryByStockSymbol(stock.symbol);
    });
  }

  getStockHistoryByStockSymbol(stockSymbol: string): void {
    this.stockDataService.getStockHistoryByStockSymbol(stockSymbol)
      .subscribe(stockPrices => this.stockPrices = stockPrices);
  }
}
