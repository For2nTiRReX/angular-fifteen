import { NgModule } from '@angular/core';
import { SharedModule } from 'shared-module/shared.module';
import { StatisticRoutingModule } from 'statistic-module/statistic-routing.module';
import { TopPlayersComponent } from './components/top-players.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TopPlayersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
