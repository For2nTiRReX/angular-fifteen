import { NgModule } from '@angular/core';
import { SharedModule } from 'shared-module/shared.module';
import { StatisticRoutingModule } from 'statistic-module/statistic-routing.module';
import { TopPlayersComponent } from './components/top-players.component';

@NgModule({
  declarations: [
    TopPlayersComponent
  ],
  imports: [
    SharedModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
