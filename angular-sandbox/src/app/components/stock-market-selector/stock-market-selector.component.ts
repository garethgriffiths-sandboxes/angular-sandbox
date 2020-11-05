import { Component, OnInit } from '@angular/core';

import { StockDataService } from '../../services/stock-data.service';
import { StockHistoryService } from '../../services/stock-history.service';

import { StockMarket } from '../../models/stock-market'

@Component({
  selector: 'stock-market-selector',
  templateUrl: './stock-market-selector.component.html',
  styleUrls: ['./stock-market-selector.component.min.css']
})

export class StockMarketSelectorComponent implements OnInit {
  constructor(
    private stockDataService: StockDataService,
    private stockHistoryService: StockHistoryService) { }

  stockMarkets: StockMarket[];
  selectedStockMarkets: StockMarket[];

  dropdownSettings = {};

  ngOnInit() {
    this.getStockMarkets();
  }

  onItemSelect(item: any) {
    this.stockHistoryService.setSelectedStockMarkets(this.selectedStockMarkets);
  }

  onItemDeSelect(item: any) {
    this.stockHistoryService.setSelectedStockMarkets(this.selectedStockMarkets);
  }

  onSelectAll(item: any) {
    this.stockHistoryService.setSelectedStockMarkets(this.selectedStockMarkets);
  }

  getStockMarkets(): void {
    this.stockDataService.getStockMarkets()
      .subscribe(stockMarkets => this.stockMarkets = stockMarkets);
  }
}
