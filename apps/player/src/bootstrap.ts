import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlayerModule } from './app/player.module';

platformBrowserDynamic()
  .bootstrapModule(PlayerModule)
  .catch(err => console.error(err));
