import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'core-module/components/home/home.component';
import { PlayerAuthGuardService } from 'shared-module/services/player-auth-guard.service';

//import { LoginModule } from 'login-module/login.module';
import { GameModule } from 'game-module/game.module';
import { StatisticModule } from 'statistic-module/statistic.module';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login', loadChildren: 'login-module/login.module#LoginModule'
    },
    {
        path: 'game', loadChildren: 'game-module/game.module#GameModule',
        canActivate: [ PlayerAuthGuardService ]
    },
    {
        path: 'top-players', loadChildren: 'statistic-module/statistic.module#StatisticModule'
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
