import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from "../services/player-service.service";
import { Player } from "../models/player";
import { Observable } from 'rxjs/Rx';
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
