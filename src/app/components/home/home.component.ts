import { Component, OnInit } from '@angular/core';
import { Player } from "models/index";
import { PlayerServiceService } from 'shared-module/services/player-service.service';

@Component({
  selector: 'fifteen-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public player: Player;
  constructor( private playerServiceService: PlayerServiceService ) {}

  ngOnInit() {
    this.playerServiceService.getPlayer().subscribe( player => {
      if (player instanceof Player) {
        this.player = player;
      }
      return;
    } );
  }

}
