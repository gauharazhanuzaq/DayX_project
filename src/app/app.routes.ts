import { Routes } from '@angular/router';
import { Faq } from './faq/faq';
import { MyStory } from './my-story/my-story';
import { ApiDemoComponent } from './api-demo/api-demo';

export const routes: Routes = [
  { path: '', redirectTo: 'my-story', pathMatch: 'full' },
  { path: 'My story', component: MyStory },
  { path: 'Faq', component: Faq },
  { path: 'What people say?', component: ApiDemoComponent },
];
