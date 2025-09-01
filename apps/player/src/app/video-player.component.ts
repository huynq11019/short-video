import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import Player from 'player.js';
import { supabase } from '@short-video/shared-utils';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="controls">
      <div>Likes: {{likes}}</div>
      <div>Comments: {{comments}}</div>
      <sv-button (clicked)="like()">Like</sv-button>
      <sv-button (clicked)="toggleMute()">Toggle Mute</sv-button>
    </div>
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
export class VideoPlayerComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() src = '';
  @Input() videoId!: number;
  likes = 0;
  comments = 0;
  @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('frame') frameRef?: ElementRef<HTMLIFrameElement>;

  private hls?: Hls;
  private observer?: IntersectionObserver;
  private player?: any;
  private likeChannel: any;
  private commentChannel: any;
  isEmbed = false;

  ngOnInit() {
    if (this.videoId) {
      this.likeChannel = supabase
        .channel('public:likes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'likes', filter: `video_id=eq.${this.videoId}` },
          async () => {
            const { count } = await supabase
              .from('likes')
              .select('*', { count: 'exact', head: true })
              .eq('video_id', this.videoId);
            this.likes = count || 0;
          }
        )
        .subscribe();

      this.commentChannel = supabase
        .channel('public:comments')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'comments', filter: `video_id=eq.${this.videoId}` },
          async () => {
            const { count } = await supabase
              .from('comments')
              .select('*', { count: 'exact', head: true })
              .eq('video_id', this.videoId);
            this.comments = count || 0;
          }
        )
        .subscribe();
    }
  }

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
    this.likeChannel?.unsubscribe();
    this.commentChannel?.unsubscribe();
  }

  toggleMute() {
    const video = this.videoRef?.nativeElement;
    if (video) {
      video.muted = !video.muted;
    }
  }

  async like() {
    await supabase.from('likes').insert({ video_id: this.videoId });
  }
}
