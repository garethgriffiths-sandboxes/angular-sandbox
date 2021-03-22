import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output()
  public clickOutside = new EventEmitter();

  // listens to DOM events
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const clickedInside = this.elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      // sends the event to subscribers 
      this.clickOutside.emit(null);
    }
  }
}
