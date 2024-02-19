import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { GameComponent } from './components/game/game.component';
import { APP_ROUTES } from '../config';

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    component: GameComponent,
  },
  {
    path: APP_ROUTES.STATS,
    component: StatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
