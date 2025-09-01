import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './comments.component';
import { UiKitModule } from '@short-video/ui-kit';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, ReactiveFormsModule, UiKitModule],
  exports: [CommentsComponent],
  bootstrap: [CommentsComponent]
})
export class CommentsModule {}
