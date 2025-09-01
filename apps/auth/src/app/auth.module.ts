import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { UiKitModule } from '@short-video/ui-kit';

@NgModule({
  declarations: [AuthComponent],
  imports: [BrowserModule, ReactiveFormsModule, UiKitModule],
  exports: [AuthComponent]
})
export class AuthModule {}
