import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { UiKitModule } from '@short-video/ui-kit';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [CommonModule, UiKitModule],
  exports: [VideoPlayerComponent],
  bootstrap: [VideoPlayerComponent]
})
export class PlayerModule {}
