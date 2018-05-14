import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayGameComponent } from './play/play-game/play-game.component';
import {HomeComponent} from "./home/home.component";
import {TopPlayersComponent} from "./top-players/top-players.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'game',
        component: PlayGameComponent
    },
    { path: "top-players", component: TopPlayersComponent },
    { path: "login", component: LoginComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule { }
