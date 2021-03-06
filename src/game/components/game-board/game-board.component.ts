import { Component, EventEmitter, Output } from '@angular/core';
import { Tile } from 'models/index';
import { environment } from 'environments/environment';

@Component({
    selector: 'fifteen-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss']
})


export class GameBoardComponent {

    tiles: Array<Tile>;
    emptyTileIndex: number;
    tileWidth: number;
    tileHeight: number;
    tileGap: number;
    containerWidth: number;
    @Output() incrementMoveCounter = new EventEmitter<String>();
    @Output() putScore = new EventEmitter<String>();

    constructor() {
        this.tiles = [];
        this.containerWidth = environment.gameBoardConfig.containerWidth;
        this.tileGap = environment.gameBoardConfig.tileGap;
        this.tileWidth = this.containerWidth / 4;
        this.tileHeight = this.containerWidth / 4;
    }

    public swapElements(event, label) {

        let currTileIndex = this.tiles.indexOf(label);
        const curr = Object.assign({}, this.tiles[currTileIndex]);
        const empty = Object.assign({}, this.tiles[this.emptyTileIndex]);
        const positionCurrent = this.tiles[currTileIndex].positionCurrent;
        const positionEmpty = this.tiles[this.emptyTileIndex].positionCurrent;

        if (positionCurrent - 1 === positionEmpty && (positionCurrent % 4) !== 0) {
            // console.log('slideleft');
            this.tiles[currTileIndex].moveTile(-this.tileWidth, 0);
            this.tiles[this.emptyTileIndex].moveTile(this.tileWidth, 0);
        } else if (positionCurrent + 1 === positionEmpty && (positionCurrent % 4) !== 3) {
            // console.log('slideright');
            this.tiles[currTileIndex].moveTile(this.tileWidth, 0);
            this.tiles[this.emptyTileIndex].moveTile(-this.tileWidth, 0);
        } else if (positionCurrent - 4 === positionEmpty) {
            // console.log('slideup');
            this.tiles[currTileIndex].moveTile(0, -this.tileHeight);
            this.tiles[this.emptyTileIndex].moveTile(0, this.tileHeight);
        } else if (positionCurrent + 4 === positionEmpty) {
            // console.log('slidedown');
            this.tiles[currTileIndex].moveTile(0, this.tileHeight);
            this.tiles[this.emptyTileIndex].moveTile(0, -this.tileHeight);
        } else {
            // console.log('You ca\'nt do this move');
            return;
        }


        this.tiles[currTileIndex].positionCurrent = empty.positionCurrent;
        this.tiles[this.emptyTileIndex].positionCurrent = curr.positionCurrent;

        this.tiles.filter(function (element, index) {
            if (element.isEmpty) {
                this.emptyTileIndex = index;
                return;
            }
        }, this);
        this.incrementMoveCounter.emit('Move It');
        this.checkWin();
        return;
    }


    public checkWin() {
        for (let i = 0; i <= 14; i++) {
            if (+this.tiles[i].label != this.tiles[i].positionCurrent + 1) {
                return false;
            }
        }
        this.putScore.emit('You win!');
        //  this.pointsServiceService.setNewResult( this.movesCounter, this.timerComponent.getTimeSeconds() );
        return true;
    }


    public initBoard() {
        let labelsInit = [];
        for (let i = 0; i <= 14; i++) {
            labelsInit[i] = i + 1 + '';
        }
        labelsInit[15] = '';
        let parity = this.shuffle(labelsInit);
        this.emptyTileIndex = labelsInit.indexOf('');
        parity += this.emptyTileIndex + Math.floor(this.emptyTileIndex / 4);

        // Switch labels if necessary to guarantee that a solution exists.
        // See https://en.wikipedia.org/wiki/15_puzzle#Solvability
        if (parity % 2) { this.exchange(labelsInit, 0, 2); }

        let k = 0;
        for (let i = 0; i < labelsInit.length / 4; i++) {
            for (let j = 0; j < labelsInit.length / 4; j++) {
                this.tiles[k] = new Tile(k, k, labelsInit[k], i * this.tileHeight, j * this.tileWidth, labelsInit[k] === '' ? true : false);
                k++;
            }
        }
    }

    // Fisher-Yates shuffle
    public shuffle(a) {
        let j, x, i, swaps = 0;
        for (i = a.length; i > 1; i--) {
            j = Math.floor(Math.random() * i);
            if (i - 1 != j) {
                this.exchange(a, i - 1, j);
                swaps++;
            }
        }
        return swaps;
    }

    // Swap entries a[i] and a[j] in the array a.
    public exchange(a, i, j) {
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

}