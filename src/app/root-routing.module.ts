import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    // {
    //     path: 'game',
    //     canActivate: [ PlayerAuthGuardService ],
    //     component: PlayGameComponent
    // },
    // { path: 'top-players', component: TopPlayersComponent },
    // { path: 'login', component: LoginComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule { }
