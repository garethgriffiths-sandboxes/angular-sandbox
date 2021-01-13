import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { StockDataService } from '../../services/stock-data.service';
import { StockMarket } from '../../models/stock-market'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'stock-market-selector',
  templateUrl: './stock-market-selector.component.html',
  styleUrls: ['./stock-market-selector.component.min.css']
})

export class StockMarketSelectorComponent implements OnInit {
  constructor(
    private stockDataService: StockDataService) {
    this.filteredStockMarkets = this.stockMarketControl.valueChanges.pipe(
      startWith(null),
      map((stockMarket: string | null) => stockMarket ? this._filter(stockMarket) : this.stockMarkets.slice()));
  }

  ngOnInit() {
    this.getStockMarkets();
  }

  getStockMarkets(): void {
    this.stockDataService.getStockMarkets()
      .subscribe(stockMarkets => this.stockMarkets = stockMarkets);
  }

  stockMarkets: StockMarket[];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  stockMarketControl = new FormControl();
  filteredStockMarkets: Observable<StockMarket[]>;
  selectedStockMarkets: StockMarket[];

  dropdownSettings = {};
  @ViewChild('stockMarketInput') stockMarketInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const selectedStockMarket = event.value;

    if (selectedStockMarket) {
    //  this.selectedStockMarkets.push(selectedStockMarket);
    }

    if (input) {
      input.value = '';
    }

    this.stockMarketControl.setValue(null);
  }

  remove(fruit: StockMarket): void {
    const index = this.selectedStockMarkets.indexOf(fruit);

    if (index >= 0) {
      this.selectedStockMarkets.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedStockMarkets.push(event.option.value);
    this.stockMarketInput.nativeElement.value = '';
    this.stockMarketControl.setValue(null);
  }

  private _filter(value: string): StockMarket[] {
    const filterValue = value;
    return this.stockMarkets.filter(stockMarket => stockMarket.name.indexOf(filterValue) === 0);
  }
}
