import { Component, OnDestroy } from '@angular/core';
import { getToken, clearToken, authEventBus, AUTH_EVENTS, supabase } from '@short-video/shared-utils';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="user; else loggedOut">
      <h2>{{user.email}}</h2>
      <h3>Your Videos</h3>
      <ul>
        <li *ngFor="let v of videos">{{v.title}}</li>
      </ul>
      <sv-button (clicked)="logout()">Logout</sv-button>
    </div>
    <ng-template #loggedOut>
      <p>Please log in.</p>
    </ng-template>
  `
})
export class ProfileComponent implements OnDestroy {
  user: any = null;
  videos: any[] = [];
  private unsub?: () => void;

  constructor() {
    this.unsub = authEventBus.on(AUTH_EVENTS.AUTH_CHANGED, user => {
      this.user = user;
      this.loadVideos();
    });
    this.init();
  }

  ngOnDestroy() {
    this.unsub && this.unsub();
  }

  private async init() {
    const token = getToken();
    if (!token) return;
    const { data } = await supabase.auth.getUser(token);
    this.user = data.user;
    this.loadVideos();
  }

  private async loadVideos() {
    if (!this.user) return;
    const { data } = await supabase.from('videos').select('*').eq('user_id', this.user.id);
    this.videos = data || [];
  }

  async logout() {
    await supabase.auth.signOut();
    clearToken();
    authEventBus.emit(AUTH_EVENTS.AUTH_CHANGED, null);
    this.user = null;
    this.videos = [];
  }
}
