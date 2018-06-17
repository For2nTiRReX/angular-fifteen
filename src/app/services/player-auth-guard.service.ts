import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { PlayerServiceService } from './player-service.service';
import { Player } from '../models/player';


@Injectable()
export class PlayerAuthGuardService implements CanActivate {

  constructor( public playerServiceService: PlayerServiceService, private router: Router) {}

  canActivate() {
      return this.playerServiceService.getPlayer()
          .first()
          .do((user:Player) => {
              if(user === null) {
                  this.router.navigate(['/login']);
              }
          })
          .map((user:Player) => {
            if(user instanceof Player) {
                return true;
            } else {
                return false;
            }
          });
  }

}
