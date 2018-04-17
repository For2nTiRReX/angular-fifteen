import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RootRoutingModule } from './root-routing.module';
import {PlayGameComponent} from './play/play-game/play-game.component';



@NgModule({
  declarations: [
    AppComponent,
    PlayGameComponent
  ],
  imports: [
    RootRoutingModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
