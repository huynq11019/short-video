import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  it('should toggle mute', () => {
    const comp = new VideoPlayerComponent();
    comp.videoRef = { nativeElement: { muted: false } } as any;
    comp.toggleMute();
    expect(comp.videoRef.nativeElement.muted).toBe(true);
  });
});
