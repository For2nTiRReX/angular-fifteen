import { Player } from './index';

export class Points {

    _id: string;
    moves: number;
    time: number;
    player_id: string;
    player?: Player;

    constructor(
        _id: string,
        moves: number,
        time: number,
        player_id: string,
        player?: Player
    ) {
        this._id = _id;
        this.moves = moves;
        this.time = time;
        this.player_id = player_id;
        this.player = player;
    }

}
