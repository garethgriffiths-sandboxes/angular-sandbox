import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FundDataService } from '../../services/fund-data.service';
import { Fund } from '../../models/fund'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectionListChange } from '@angular/material/list';

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
      map((fund: string | null) => fund ? this._filter(fund) :
        this.allFunds.slice().filter(fund => this.selectedFunds.indexOf(fund) < 0)));
  }

  visible = true;
  selectable = true;
  removable = true;
  selectedFundsListVisible = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fundControl = new FormControl();
  filteredFunds: Observable<Fund[]>;
  selectedFunds: Fund[] = [];
  allFunds: Fund[] = [];
  dropdownSettings = {};
  @ViewChild('fundInput') fundInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) selectFundInputAutocomplete: MatAutocompleteTrigger;

  ngOnInit() {
    this.getFunds();
  }

  getFunds(): void {
    this.fundDataService.getFunds()
      .subscribe(funds => {
        this.allFunds = funds.sort((fundOne, fundTwo) => fundOne.name.localeCompare(fundTwo.name));
      });
  }

  addFund(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    var fundToAdd = this.allFunds.find(fund => fund.name === value || fund.symbol === value)

    if ((value || '').trim()) {
      this.selectedFunds.push(fundToAdd);
    }

    if (input) {
      input.value = '';
    }

    this.fundControl.setValue(null);
  }

  removeFund(fundToRemove: Fund): void {
    const fund = this.selectedFunds.find(fund => fund.name === fundToRemove.name && fund.symbol === fundToRemove.symbol);
    const fundIndex = this.selectedFunds.indexOf(fund);

    if (fundIndex >= 0) {
      this.selectedFunds.splice(fundIndex, 1);
      this.fundControl.setValue(this.fundControl.value);
    }
  }

  addSelectedFund(event: MatAutocompleteSelectedEvent): void {
    var fundToAdd = event.option.value;
    this.selectedFunds.push(fundToAdd);
    this.fundInput.nativeElement.value = '';
    this.fundControl.setValue(null);
  }

  toggleSelectedFundsListVisibility() {
    this.selectedFundsListVisible = this.selectedFundsListVisible ? false : true;
  }

  onSelectFundInputClick(event: { stopPropagation: () => void; }): void {
    event.stopPropagation();
    this.selectFundInputAutocomplete.openPanel();
  }

  onSelectedFundsListSelectionChange(event: MatSelectionListChange) {
    var fundToRemove = event.option.value;
    this.removeFund(fundToRemove);
  }

  private _filter(value: string): Fund[] {
    const filterValue = value.toString().toLowerCase();

    return this.allFunds.filter(fund =>
      this.selectedFunds.indexOf(fund) < 0 && (
        fund.name.toString().toLowerCase().includes(filterValue)
        || fund.symbol.toString().toLowerCase().includes(filterValue)));
  }
}