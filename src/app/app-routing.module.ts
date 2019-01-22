import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'core-module/components/home/home.component';
import { PlayerAuthGuardService } from 'shared-module/services/player-auth-guard.service';

import { LoginModule } from 'login-module/login.module';
import { GameModule } from 'game-module/game.module';
import { StatisticModule } from 'statistic-module/statistic.module';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login', loadChildren: () => LoginModule
        // './../login/login.module#LoginModule'
    },
    {
        path: 'game', loadChildren: () => GameModule,
        canActivate: [ PlayerAuthGuardService ]
        // 'login-module/login.module#GameModule'
    },
    {
        path: 'top-players', loadChildren: () => StatisticModule,
        // 'login-module/login.module#GameModule'
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
