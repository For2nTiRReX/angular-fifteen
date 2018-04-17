import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayGameComponent } from './play/play-game/play-game.component';

const routes: Routes = [
    {
        path: '',
        component: PlayGameComponent
    },
    /*{ path: "login", component: LoginComponent },
    { path: "404", component: Page404Component },*/

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule { }
