import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import Player from 'player.js';

@Component({
  selector: 'app-video-player',
  template: `
    <sv-button (clicked)="toggleMute()">Toggle Mute</sv-button>
    <ng-container *ngIf="isEmbed; else videoTpl">
      <iframe
        #frame
        class="w-full h-60"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </ng-container>
    <ng-template #videoTpl>
      <video #video class="w-full h-60" controls></video>
    </ng-template>
  `
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @Input() src = '';
  @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('frame') frameRef?: ElementRef<HTMLIFrameElement>;

  private hls?: Hls;
  private observer?: IntersectionObserver;
  private player?: any;
  isEmbed = false;

  ngAfterViewInit() {
    this.isEmbed = this.src.includes('embed');
    const target = this.isEmbed
      ? this.frameRef?.nativeElement
      : this.videoRef?.nativeElement;

    if (!target) {
      return;
    }

    if (this.isEmbed) {
      const frame = target as HTMLIFrameElement;
      frame.src = this.src;
      this.player = new Player(frame);
    } else {
      const video = target as HTMLVideoElement;
      if (this.src.endsWith('.m3u8') && Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.src);
        this.hls.attachMedia(video);
      } else {
        video.src = this.src;
      }
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (this.isEmbed) {
            if (entry.isIntersecting) {
              this.player?.play();
            } else {
              this.player?.pause();
            }
          } else {
            const video = target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(target);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.hls?.destroy();
    this.player?.pause();
  }

  toggleMute() {
    const video = this.videoRef?.nativeElement;
    if (video) {
      video.muted = !video.muted;
    }
  }
}
