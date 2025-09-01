import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';
import { UiKitModule } from '@short-video/ui-kit';

@NgModule({
  declarations: [ProfileComponent],
  imports: [BrowserModule, UiKitModule],
  exports: [ProfileComponent]
})
export class ProfileModule {}
