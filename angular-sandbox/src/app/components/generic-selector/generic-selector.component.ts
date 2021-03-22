import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FundDataService } from '../../services/fund-data.service';
import { Fund } from '../models/fund';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-generic-selector',
  templateUrl: './generic-selector.component.html',
  styleUrls: ['./generic-selector.component.scss'],
})
export class GenericSelectorComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  constructor(private fundDataService: FundDataService) {
    this.filteredItems = this.genericSelectorControl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item
          ? this._filter(item)
          : this.allItems
              .slice()
              .filter(
                (currentItem) => this.selectedItems.indexOf(currentItem) < 0
              )
      )
    );
  }
  @Input() itemNameSingular: string;
  @Input() itemNamePlural: string;
  @Input() chipColour: string;
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  visible = true;
  selectable = true;
  removable = true;
  selectedItemsListVisible = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genericSelectorControl = new FormControl();
  filteredItems: Observable<Fund[]>;
  selectedItems: Fund[] = [];
  allItems: Fund[] = [];
  genericSelectorAutocomplete: MatAutocompleteTrigger;

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds(): void {
    this.fundDataService
      .getFunds()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((items) => {
        this.allItems = items.sort((itemOne, itemTwo) =>
          itemOne.name.localeCompare(itemTwo.name)
        );
      });
  }

  addItem(event: MatChipInputEvent): void {
    if (event == null || event.value == null) {
      return;
    }

    const itemValue = event.value.toString().toLowerCase();

    const itemToAdd = this.selectedItems.find(
      (item) =>
        item.name.toString().toLocaleLowerCase() === itemValue ||
        item.symbol.toString().toLocaleLowerCase() === itemValue
    );

    if (itemToAdd) {
      this.selectedItems.push(itemToAdd);
    }

    const input = event.input;
    if (input) {
      input.value = '';
    }

    this.genericSelectorControl.setValue(null);
  }

  removeItem(itemToRemove: Fund): void {
    const item = this.selectedItems.find(
      (currentItem) =>
        currentItem.name === itemToRemove.name &&
        currentItem.symbol === itemToRemove.symbol
    );

    const itemIndex = this.selectedItems.indexOf(item);

    if (itemIndex >= 0) {
      this.selectedItems.splice(itemIndex, 1);
      this.genericSelectorControl.setValue(this.genericSelectorControl.value);
    }
  }

  addSelectedItem(event: MatAutocompleteSelectedEvent): void {
    const itemToAdd = event.option.value;
    this.selectedItems.push(itemToAdd);
    this.chipInput.nativeElement.value = '';
    this.genericSelectorControl.setValue(null);
  }

  toggleSelectedItemsListVisibility(): void {
    this.selectedItemsListVisible = this.selectedItemsListVisible
      ? false
      : true;
  }

  onChipInputClick(event: { stopPropagation: () => void }): void {
    event.stopPropagation();
    if (this.genericSelectorAutocomplete) {
      this.genericSelectorAutocomplete.openPanel();
    }
  }

  onSelectedItemsListSelectionChange(event: MatSelectionListChange): void {
    const itemToRemove = event.option.value;
    this.removeItem(itemToRemove);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private _filter(value: string): Fund[] {
    if (value == null) {
      return;
    }

    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(
      (item) =>
        this.selectedItems.indexOf(item) < 0 &&
        (item.name.toString().toLowerCase().includes(filterValue) ||
          item.symbol.toString().toLowerCase().includes(filterValue))
    );
  }
}
