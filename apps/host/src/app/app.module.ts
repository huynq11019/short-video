import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UiKitModule } from '@short-video/ui-kit';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'feed',
    loadChildren: () => import('feed/FeedModule').then(m => m.FeedModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiKitModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
