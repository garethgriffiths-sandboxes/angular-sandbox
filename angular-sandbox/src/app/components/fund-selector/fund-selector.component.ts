import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FundDataService } from 'src/app/services/fund-data.service';
import { GenericSelectorItem } from '../generic-selector/generic-selector-item';

@Component({
  selector: 'app-fund-selector',
  templateUrl: './fund-selector.component.html',
  styleUrls: ['./fund-selector.component.scss'],
})
export class FundSelectorComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  funds: GenericSelectorItem[] = [];

  constructor(
    private fundDataService: FundDataService
  ) {}

  ngOnInit(): void {
    this._getFunds();
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
}
