import { TestBed, waitForAsync } from '@angular/core/testing';
import { GenericSelectorComponent } from './generic-selector.component';

describe('GenericSelectorComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenericSelectorComponent],
      }).compileComponents();
    })
  );
});
