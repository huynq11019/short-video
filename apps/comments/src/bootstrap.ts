import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommentsModule } from './app/comments.module';

platformBrowserDynamic()
  .bootstrapModule(CommentsModule)
  .catch(err => console.error(err));
