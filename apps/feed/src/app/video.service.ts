import { Injectable } from '@angular/core';
import { apiFetch } from '@short-video/shared-utils';

export interface Video {
  id: number;
  title: string;
  src: string;
}

const MOCK_VIDEOS: Video[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  title: `Video ${i + 1}`,
  src: `https://placehold.co/320x240?text=Video+${i + 1}`
}));

@Injectable({ providedIn: 'root' })
export class VideoService {
  private pageSize = 10;

  async getVideos(page: number): Promise<Video[]> {
    try {
      return await apiFetch<Video[]>(`/videos?page=${page}`);
    } catch {
      const start = page * this.pageSize;
      return MOCK_VIDEOS.slice(start, start + this.pageSize);
    }
  }
}
