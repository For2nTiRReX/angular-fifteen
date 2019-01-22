import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopPlayersComponent } from './components/top-players.component';

const routes: Routes = [
    {
        path: '',
        component: TopPlayersComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
