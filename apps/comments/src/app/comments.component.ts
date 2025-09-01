import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { supabase } from '@short-video/shared-utils';

interface Comment {
  id: number;
  video_id: number;
  content: string;
}

@Component({
  selector: 'app-comments',
  template: `
    <div *ngFor="let c of comments">{{c.content}}</div>
    <form [formGroup]="form" (ngSubmit)="addComment()">
      <input type="text" formControlName="content" placeholder="Add a comment" />
      <sv-button>Submit</sv-button>
    </form>
  `
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() videoId!: number;
  comments: Comment[] = [];
  form: FormGroup;
  private channel: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ content: [''] });
  }

  async ngOnInit() {
    if (!this.videoId) return;
    const { data } = await supabase
      .from<Comment>('comments')
      .select('*')
      .eq('video_id', this.videoId);
    this.comments = data || [];
    this.channel = supabase
      .channel('public:comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `video_id=eq.${this.videoId}` },
        payload => {
          this.comments.push(payload.new as Comment);
        }
      )
      .subscribe();
  }

  async addComment() {
    const content = this.form.value.content;
    if (!content) return;
    await supabase.from('comments').insert({ video_id: this.videoId, content });
    this.form.reset();
  }

  ngOnDestroy() {
    this.channel?.unsubscribe();
  }
}
