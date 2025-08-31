import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [CommonModule],
  exports: [VideoPlayerComponent],
  bootstrap: [VideoPlayerComponent]
})
export class PlayerModule {}
