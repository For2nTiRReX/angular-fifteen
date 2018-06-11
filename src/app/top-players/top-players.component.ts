import { Component, OnInit } from '@angular/core';
import {PointsServiceService} from '../services/points-service.service';

@Component({
  selector: 'fifteen-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  constructor(public pointsServiceService: PointsServiceService) { }

  ngOnInit() {
    console.log(this.pointsServiceService.getTopPlayers(10));
  }

}
