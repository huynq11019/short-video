import { Injectable } from '@angular/core';
import { supabase } from '@short-video/shared-utils';

export interface Video {
  id: number;
  title: string;
  src: string;
  likes?: number;
  comments?: number;
}

export interface Comment {
  id: number;
  video_id: number;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  private pageSize = 10;

  async getVideos(page: number): Promise<Video[]> {
    const start = page * this.pageSize;
    const end = start + this.pageSize - 1;
    const { data } = await supabase
      .from('videos')
      .select('id,title,file_path')
      .range(start, end);
    if (!data) return [];
    return data.map(v => ({
      id: v.id,
      title: v.title,
      src: supabase.storage.from('videos').getPublicUrl(v.file_path).data.publicUrl,
      likes: 0,
    }));
  }

  async likeVideo(videoId: number): Promise<void> {
    await supabase.from('likes').insert({ video_id: videoId });
  }

  onLikes(videoId: number, cb: (count: number) => void) {
    return supabase
      .channel('public:likes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes', filter: `video_id=eq.${videoId}` },
        async () => {
          const { count } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('video_id', videoId);
          cb(count || 0);
        }
      )
      .subscribe();
  }

  onCommentsCount(videoId: number, cb: (count: number) => void) {
    return supabase
      .channel('public:comments')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `video_id=eq.${videoId}` },
        async () => {
          const { count } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('video_id', videoId);
          cb(count || 0);
        }
      )
      .subscribe();
  }

  async addComment(videoId: number, content: string): Promise<void> {
    await supabase.from('comments').insert({ video_id: videoId, content });
  }

  onComments(videoId: number, cb: (comment: Comment) => void) {
    return supabase
      .channel('public:comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `video_id=eq.${videoId}` },
        payload => cb(payload.new as Comment)
      )
      .subscribe();
  }
}
