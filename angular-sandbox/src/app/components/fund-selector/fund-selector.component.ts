import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FundDataService } from '../../services/fund-data.service';
import { Fund } from '../../models/fund'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'fund-selector',
  templateUrl: './fund-selector.component.html',
  styleUrls: ['./fund-selector.component.scss']
})

export class FundSelectorComponent implements OnInit {
  constructor(
    private fundDataService: FundDataService) {
    this.filteredFunds = this.fundControl.valueChanges.pipe(
      startWith(null),
      map((fund: string | null) => fund ? this._filter(fund) : this.funds.slice()));
  }

  ngOnInit() {
    this.getFunds();
  }
  getFunds(): void {
    this.fundDataService.getFunds()
      .subscribe(funds => this.funds = funds);
  }

  funds: Fund[];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fundControl = new FormControl();
  filteredFunds: Observable<Fund[]>;
  selectedFunds: Fund[];

  dropdownSettings = {};
  @ViewChild('fundInput') fundInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const selectedFund = event.value;

    if (selectedFund) {
    //  this.selectedFundMarkets.push(selectedFundMarket);
    }

    if (input) {
      input.value = '';
    }

    this.fundControl.setValue(null);
  }

  remove(fruit: Fund): void {
    const index = this.selectedFunds.indexOf(fruit);

    if (index >= 0) {
      this.selectedFunds.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedFunds.push(event.option.value);
    this.fundInput.nativeElement.value = '';
    this.fundControl.setValue(null);
  }

  private _filter(value: string): Fund[] {
    const filterValue = value;
    return this.funds.filter(fund => fund.name.indexOf(filterValue) === 0);
  }
}
