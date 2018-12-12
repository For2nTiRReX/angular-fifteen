import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { PlayerServiceService } from 'shared-module/services/player-service.service';
import { Player } from 'models/index';


@Injectable()
export class PlayerAuthGuardService implements CanActivate {

    constructor( public playerServiceService: PlayerServiceService, private router: Router) {}

    canActivate() {
        if (this.playerServiceService.getPlayer() instanceof Player) {
            return true;
        } else {
            if (localStorage.getItem('player')) {
                const localStorageUser =  JSON.parse(localStorage.getItem('player'));
                return this.playerServiceService.loginUser(localStorageUser.name).then( player => {
                    if ( player instanceof Player) {
                        return true;
                    }
                });
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        }
    }

}
