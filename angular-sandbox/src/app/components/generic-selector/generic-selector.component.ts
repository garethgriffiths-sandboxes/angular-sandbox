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
  // update properties when DOM changes
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  genericSelectorAutocomplete: MatAutocompleteTrigger;

  constructor() {
    this.filteredItems = this.genericSelectorControl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item
          ? this._filter(item)
          : this.items
              .sort((itemOne, itemTwo) => {
                // alphabetical order
                return itemOne.longName.localeCompare(itemTwo.longName);
              })
              .slice()
              .filter(
                // don't suggest already selected items
                (currentItem) => this.selectedItems.indexOf(currentItem) < 0
              )
      )
    );
  }

  addClickedItem(event: MatAutocompleteSelectedEvent): void {
    if (event == null || event.option == null || !event.option.value) {
      return;
    }

    const clikedItem = event.option.value;
    this.selectedItems.push(clikedItem);

    // clear the chip input of text
    this.chipInput.nativeElement.value = '';
    this.genericSelectorControl.setValue(null);
  }

  addTypedItem(event: MatChipInputEvent): void {
    if (event == null || event.value == null) {
      return;
    }

    const typedItem = event.value.toString().toLowerCase();
    this._addSelectedItem(typedItem);

    // clear typed item
    const input = event.input;
    if (input) {
      input.value = '';
    }
    this.genericSelectorControl.setValue(null);
  }

  removeClickedItem(itemToRemove: GenericSelectorItem): void {
    this._removeSelectedItem(itemToRemove);
  }

  onChipInputClick(event: { stopPropagation: () => void }): void {
    // open autocomplete panel on click
    event.stopPropagation();
    if (this.genericSelectorAutocomplete) {
      this.genericSelectorAutocomplete.openPanel();
    }
  }

  toggleSelectedItemsListVisibility(): void {
    // switch whether selected item drop down is visible
    this.selectedItemsListVisible = this.selectedItemsListVisible
      ? false
      : true;
  }

  onSelectedItemsListSelectionChange(event: MatSelectionListChange): void {
    // remove items if unchecked from selection list
    if (event == null || event.option == null || !event.option.value) {
      return;
    }

    const itemToRemove = event.option.value;
    this._removeSelectedItem(itemToRemove);
  }

  paste(event: ClipboardEvent): void {
    if (event == null) {
      return;
    }

    event.preventDefault();
    event.clipboardData
      .getData('Text')
      .split(/,/)
      .forEach((value) => {
        if (value.trim()) {
          this._addSelectedItem(value.trim());
        }
      });
  }

  private _addSelectedItem(typedName: string): void {
    if (!typedName) {
      return;
    }

    let itemToFind = typedName.toString().toLowerCase();

    // find item to add it
    let itemToAdd = this.items.find(
      (item) =>
        item.longName.toString().toLowerCase() === itemToFind ||
        item.shortName.toString().toLowerCase() === itemToFind
    );

    if (itemToAdd) {
      this.selectedItems.push(itemToAdd);
    }
  }

  private _removeSelectedItem(itemToRemove: GenericSelectorItem): void {
    if (itemToRemove == null) {
      return;
    }

    const item = this.selectedItems.find(
      (currentItem) =>
        currentItem.shortName === itemToRemove.shortName &&
        currentItem.longName === itemToRemove.longName
    );

    // find index of selected item to remove it.
    const itemIndex = this.selectedItems.indexOf(item);

    if (itemIndex >= 0) {
      this.selectedItems.splice(itemIndex, 1);
      this.genericSelectorControl.setValue(this.genericSelectorControl.value);
    }
  }

  private _filter(value: string): GenericSelectorItem[] {
    if (!value) {
      return;
    }

    const filterValue = value.toString().toLowerCase();

    // filter by long and short name ignoring case
    return this.items.filter(
      (item) =>
        this.selectedItems.indexOf(item) < 0 &&
        (item.shortName.toString().toLowerCase().includes(filterValue) ||
          item.longName.toString().toLowerCase().includes(filterValue))
    );
  }
}
