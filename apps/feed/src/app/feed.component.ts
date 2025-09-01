import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, HostListener } from '@angular/core';
import { VideoService, Video } from './video.service';
import { trackEvent, ANALYTICS_EVENTS } from '@short-video/shared-utils';

@Component({
  selector: 'app-feed',
  template: `
      <div class="video" *ngFor="let video of videos" #videoRef [attr.data-id]="video.id">
        <h3>{{video.title}}</h3>
        <video width="320" height="240" controls [src]="video.src"></video>
        <div>Likes: {{video.likes || 0}}</div>
        <sv-button (clicked)="like(video)">Like</sv-button>
      </div>
      <div *ngIf="loading" class="loading">Loading...</div>
      <sv-button (clicked)="loadMore()">Load More</sv-button>
    `,
  styles: ['.video{margin-bottom:24px;}']
})
export class FeedComponent implements AfterViewInit {
  videos: Video[] = [];
  private page = 0;
  loading = false;
  @ViewChildren('videoRef') videoRefs!: QueryList<ElementRef>;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadMore();
  }

  ngAfterViewInit() {
    this.observeVideos();
    this.videoRefs.changes.subscribe(() => this.observeVideos());
  }

  observeVideos() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number((entry.target as HTMLElement).dataset['id']);
          trackEvent(ANALYTICS_EVENTS.VIDEO_VIEWED, { id });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    this.videoRefs.forEach(ref => observer.observe(ref.nativeElement));
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && !this.loading) {
      this.loadMore();
    }
  }

  loadMore() {
    this.loading = true;
    this.videoService.getVideos(this.page++).then(newVideos => {
      this.videos = this.videos.concat(newVideos);
      newVideos.forEach(v =>
        this.videoService.onLikes(v.id, count => (v.likes = count))
      );
      this.loading = false;
    });
  }

  like(video: Video) {
    this.videoService.likeVideo(video.id);
  }
}
