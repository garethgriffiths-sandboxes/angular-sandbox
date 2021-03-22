import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AvailableDateDataService } from 'src/app/services/available-date-data.service';
import { FundDataService } from 'src/app/services/fund-data.service';
import { FundTypeDataService } from 'src/app/services/fund-type-data.service';
import { GenericSelectorItem } from '../generic-selector/generic-selector-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  funds: GenericSelectorItem[] = [];
  availableDates: GenericSelectorItem[] = [];
  fundTypes: GenericSelectorItem[] = [];

  constructor(
    private fundDataService: FundDataService,
    private availableDateDataService: AvailableDateDataService,
    private fundTypeDataService: FundTypeDataService
  ) {}

  ngOnInit(): void {
    this._getFunds();
    this._getAvailableDates();
    this._getFundTypes();
  }

  ngOnDestroy(): void {
    // prevent subscriber memory leaks
    this.onDestroy.next();
  }

  private _getFunds(): void {
    this.fundDataService
      .getFunds()
      .pipe(
        takeUntil(this.onDestroy),
        map((funds) =>
          funds.map(
            (fund) =>
              new GenericSelectorItem(
                fund.symbol,
                `${fund.name} (${fund.symbol})`
              )
          )
        )
      )
      .subscribe(
        (fundGenericSelectorItems) => (this.funds = fundGenericSelectorItems)
      );
  }

  private _getAvailableDates(): void {
    this.availableDateDataService
      .getAvailableDates()
      .pipe(
        takeUntil(this.onDestroy),
        map((availableDates) =>
          availableDates.map(
            (availableDate) =>
              new GenericSelectorItem(
                availableDate.date.toLocaleDateString(),
                availableDate.date.toLocaleDateString()
              )
          )
        )
      )
      .subscribe(
        (availableDateGenericSelectorItems) =>
          (this.availableDates = availableDateGenericSelectorItems)
      );
  }

  private _getFundTypes(): void {
    this.fundTypeDataService
      .getFundTypes()
      .pipe(
        takeUntil(this.onDestroy),
        map((fundTypes) =>
          fundTypes.map(
            (fundType) => new GenericSelectorItem(fundType.name, fundType.name)
          )
        )
      )
      .subscribe(
        (fundTypeGenericSelectorItems) =>
          (this.fundTypes = fundTypeGenericSelectorItems)
      );
  }
}
