import { Component, OnDestroy } from '@angular/core';
import { onEvent, ANALYTICS_EVENTS } from '@short-video/shared-utils';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Host App</h1>
      <sv-button (clicked)="onShared()">Shared Button</sv-button>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/feed">Feed</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnDestroy {
  private unsub: () => void;

  constructor() {
    this.unsub = onEvent(ANALYTICS_EVENTS.VIDEO_VIEWED, data => {
      console.log('Analytics event', data);
    });
  }

  onShared() {
    alert('Shared Button');
  }

  ngOnDestroy() {
    this.unsub && this.unsub();
  }
}
