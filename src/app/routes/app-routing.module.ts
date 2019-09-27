import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailComponent } from '../components/event-detail/event-detail.component';
import { MainComponent } from '../components/main/main.component';

const routes: Routes = [
  {
    path: 'event/:eventId',
    component: EventDetailComponent,
  },
  {
    path: ':event_type',
    component: MainComponent,
  },
  { path : '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
