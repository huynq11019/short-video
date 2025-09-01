import { FormBuilder } from '@angular/forms';
import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  it('should create', () => {
    const component = new CommentsComponent(new FormBuilder());
    expect(component).toBeTruthy();
  });
});
