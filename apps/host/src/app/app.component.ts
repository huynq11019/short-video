import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Host App</h1>
      <sv-button (clicked)="onShared()">Shared Button</sv-button>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/remote">Remote</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  onShared() {
    alert('Shared Button');
  }
}
