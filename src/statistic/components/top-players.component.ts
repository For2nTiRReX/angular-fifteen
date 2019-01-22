import { Component, OnInit } from '@angular/core';
import { Points } from "models/points";
import { PointsServiceService } from 'shared-module/services/points-service.service';

@Component({
  selector: 'fifteen-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  public topScores: Array<Points>;
  constructor(public pointsServiceService: PointsServiceService) { }

  ngOnInit() {
    this.topScores = this.pointsServiceService.getTopPlayers(10);
  }

  formatTime( time:number ): string {
    return '';
  }

}
