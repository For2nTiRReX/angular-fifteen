import { Component, OnInit } from '@angular/core';
import { PointsServiceService } from '../services/points-service.service';
import { Points } from "../models/points";

@Component({
  selector: 'fifteen-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  public topScores: Promise<Array<Points>>
  constructor(public pointsServiceService: PointsServiceService) { }

  ngOnInit() {
    this.topScores = this.pointsServiceService.getTopPlayers(10);
    console.log(this.topScores);
  }

  formatTime( time:number ): string {
    return '';
  }

}
