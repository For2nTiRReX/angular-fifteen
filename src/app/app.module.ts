import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootRoutingModule } from './root-routing.module';

import { AppComponent } from './app.component';
import { PlayGameComponent } from './play/play-game/play-game.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { TimeCounterComponent } from './play/time-counter/time-counter.component';

import { PlayerServiceService } from './services/player-service.service'
import {PlayerAuthGuardService} from './services/player-auth-guard.service';
import {PointsServiceService} from './services/points-service.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayGameComponent,
    HomeComponent,
    LoginComponent,
    TopPlayersComponent,
    TimeCounterComponent
  ],
  imports: [
    RootRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PlayerServiceService,
    PlayerAuthGuardService,
    PointsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
