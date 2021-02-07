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
      map((fund: string | null) => fund ? this._filter(fund) : this.allFunds.slice()));
  }

  ngOnInit() {
    this.getFunds();
  }

  getFunds(): void {
    this.fundDataService.getFunds()
      .subscribe(funds => this.allFunds = funds);
  }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fundControl = new FormControl();
  filteredFunds: Observable<Fund[]>;
  selectedFunds: Fund[] = [];
  allFunds: Fund[];
  dropdownSettings = {};
  @ViewChild('fundInput') fundInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
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

  remove(fundToRemove: Fund): void {
    const index = this.selectedFunds.findIndex(fund => fund.name === fundToRemove.name && fund.symbol === fundToRemove.symbol);

    if (index >= 0) {
      this.selectedFunds.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var fundToAdd = event.option.value;
    this.selectedFunds.push(fundToAdd);
    this.fundInput.nativeElement.value = '';
    this.fundControl.setValue(null);
  }

  private _filter(value: string): Fund[] {
    const filterValue = value.toString().toLowerCase();

    return this.allFunds.filter(fund => fund.name.toString().toLowerCase().indexOf(filterValue) === 0 || fund.symbol.toString().toLowerCase().indexOf(filterValue) === 0);
  }
}
