import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeedComponent } from './feed.component';
import { UiKitModule } from '@short-video/ui-kit';

@NgModule({
  declarations: [FeedComponent],
  imports: [BrowserModule, UiKitModule],
  exports: [FeedComponent]
})
export class FeedModule {}
