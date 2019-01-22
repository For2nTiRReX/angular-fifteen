import { NgModule } from '@angular/core';
import { GameBoardComponent } from 'game-module/components/game-board/game-board.component';
import { SharedModule } from 'shared-module/shared.module';
import { GameRoutingModule } from 'game-module/game-routing.module';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { TimeCounterComponent } from './components/time-counter/time-counter.component';

@NgModule({
  imports: [
    SharedModule,
    GameRoutingModule
  ],
  declarations: [
    GameBoardComponent,
    PlayGameComponent,
    TimeCounterComponent
  ]
})
export class GameModule { }
