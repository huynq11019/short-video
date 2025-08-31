import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [BrowserModule],
  exports: [FeedComponent]
})
export class FeedModule {}
