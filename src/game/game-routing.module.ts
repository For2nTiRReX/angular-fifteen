import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayGameComponent } from 'game-module/components/play-game/play-game.component';

const routes: Routes = [
    {
        path: '',
        component: PlayGameComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
