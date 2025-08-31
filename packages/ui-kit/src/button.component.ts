import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sv-button',
  template: `<button class="ui-button" (click)="handleClick($event)"><ng-content></ng-content></button>`,
  styleUrls: ['./button.css']
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<Event>();
  handleClick(event: Event) {
    this.clicked.emit(event);
  }
}
