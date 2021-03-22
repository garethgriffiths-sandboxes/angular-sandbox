import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectionListChange } from '@angular/material/list';
import { GenericSelectorItem } from './generic-selector-item';

@Component({
  selector: 'app-generic-selector',
  templateUrl: './generic-selector.component.html',
  styleUrls: ['./generic-selector.component.scss'],
})
export class GenericSelectorComponent {
  constructor() {
    this.filteredItems = this.genericSelectorControl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item
          ? this._filter(item)
          : this.items
              .slice()
              .filter(
                (currentItem) => this.selectedItems.indexOf(currentItem) < 0
              )
      )
    );
  }

  @Input() itemNameSingular = 'Item';
  @Input() itemNamePlural = 'Items';
  @Input() chipColour = '#F07C00';
  @Input() items: GenericSelectorItem[] = [];
  filteredItems: Observable<GenericSelectorItem[]>;
  selectedItems: GenericSelectorItem[] = [];
  visible = true;
  selectable = true;
  removable = true;
  selectedItemsListVisible = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genericSelectorControl = new FormControl();
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) genericSelectorAutocomplete: MatAutocompleteTrigger;

  addItem(event: MatChipInputEvent): void {
    if (event == null || event.value == null) {
      return;
    }

    const itemValue = event.value.toString().toLowerCase();

    this._add(itemValue);

    const input = event.input;
    if (input) {
      input.value = '';
    }

    this.genericSelectorControl.setValue(null);
  }

  removeItem(itemToRemove: GenericSelectorItem): void {
    const item = this.selectedItems.find(
      (currentItem) =>
        currentItem.shortName === itemToRemove.shortName &&
        currentItem.longName === itemToRemove.longName
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

  paste(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
      .getData('Text')
      .split(/,/)
      .forEach((value) => {
        if (value.trim()) {
          this._add(value.trim());
        }
      });
  }

  private _filter(value: string): GenericSelectorItem[] {
    if (value == null) {
      return;
    }

    const filterValue = value.toString().toLowerCase();

    return this.items.filter(
      (item) =>
        this.selectedItems.indexOf(item) < 0 &&
        (item.shortName.toString().toLowerCase().includes(filterValue) ||
          item.longName.toString().toLowerCase().includes(filterValue))
    );
  }

  private _add(itemName: string): void {
    if (!itemName) {
      return;
    }

    const itemToAdd = this.selectedItems.find(
      (item) =>
        item.shortName.toString().toLocaleLowerCase() === itemName ||
        item.longName.toString().toLocaleLowerCase() === itemName
    );

    if (itemToAdd) {
      this.selectedItems.push(itemToAdd);
    }
  }
}
