import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RootRoutingModule } from './root-routing.module';
import {PlayGameComponent} from './play/play-game/play-game.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { TopPlayersComponent } from './top-players/top-players.component';



@NgModule({
  declarations: [
    AppComponent,
    PlayGameComponent,
    HomeComponent,
    LoginComponent,
    TopPlayersComponent
  ],
  imports: [
    RootRoutingModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
