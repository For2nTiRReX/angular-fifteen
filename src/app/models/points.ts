import {Player} from './player';

export interface Points {
    id: string;
    moves: number;
    time: number;
    player?: Player;
}
