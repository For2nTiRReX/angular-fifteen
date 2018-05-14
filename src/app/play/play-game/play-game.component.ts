import { Component, OnInit } from '@angular/core';
import { Tile } from '../../models/index';

@Component({
    selector: 'fifteen-play-game',
    templateUrl: './play-game.component.html',
    styleUrls: ['./play-game.component.scss']
})


export class PlayGameComponent implements OnInit  {

    tiles: Array<Tile>;
    interval: any;

    clock: string;
    clockStateClass: string;

    elapsedTime: number;
    emptyTileIndex: number;
    tileWidth: number;
    tileHeight: number;
    tileGap: number;
    containerWidth: number;

    constructor() { }

    ngOnInit() {
        this.tiles = [];
        this.containerWidth = 300;
        this.tileGap = 6;
        this.tileWidth = this.containerWidth / 4;
        this.tileHeight = this.containerWidth / 4;
        this.initialize();
    }

    public initialize() {
        let labelsInit = [];
        this.elapsedTime = 0;
        this.clock = '0:00';
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;

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
            for (let j = 0;j < labelsInit.length / 4; j++) {
                this.tiles[k] = new Tile(k, labelsInit[k], i * this.tileHeight , j * this.tileWidth,labelsInit[k] === '' ? true : false);
                k++;
            }
        }

    }

    public swapElements(event, label) {
        console.log(12);
        const currTileIndex = this.tiles.indexOf(label);
        let labelsTemporary = [];
        labelsTemporary = this.tiles.slice();

        if (currTileIndex - 1 === this.emptyTileIndex && (currTileIndex % 4) !== 0) {
            console.log('slideleft');
            this.tiles[currTileIndex].positionLeft = this.tiles[currTileIndex].positionLeft - this.tileWidth;
            this.tiles[this.emptyTileIndex].positionLeft = this.tiles[this.emptyTileIndex].positionLeft + this.tileWidth;
        }
        else if (currTileIndex + 1 === this.emptyTileIndex && (currTileIndex % 4) !== 3) {
            console.log('slideright');
            this.tiles[currTileIndex].positionLeft = this.tiles[currTileIndex].positionLeft + this.tileWidth;
            this.tiles[this.emptyTileIndex].positionLeft = this.tiles[this.emptyTileIndex].positionLeft - this.tileWidth;
        }
        else if (currTileIndex - 4 === this.emptyTileIndex) {
            console.log('slideup');
            this.tiles[currTileIndex].positionTop = this.tiles[currTileIndex].positionTop - this.tileWidth;
            this.tiles[this.emptyTileIndex].positionTop = this.tiles[this.emptyTileIndex].positionTop + this.tileWidth;
        }
        else if (currTileIndex + 4 === this.emptyTileIndex) {
            console.log('slidedown');
            this.tiles[currTileIndex].positionTop = this.tiles[currTileIndex].positionTop + this.tileWidth;
            this.tiles[this.emptyTileIndex].positionTop = this.tiles[this.emptyTileIndex].positionTop - this.tileWidth;
        }
        else {
            return;
        }

        console.log(this.tiles);
        // this.tiles[currTileIndex].positionLeft = this.tiles[currTileIndex].positionLeft + 150;
        // this.tiles[this.emptyTileIndex].positionLeft = this.tiles[this.emptyTileIndex].positionLeft - 150;
        // labelTemporary = this.tiles[this.emptyTileIndex];
        // this.tiles[this.emptyTileIndex] = this.tiles[currTileIndex];
        // this.tiles[currTileIndex] = labelTemporary;
        labelsTemporary[currTileIndex] = this.tiles[this.emptyTileIndex];
        labelsTemporary[this.emptyTileIndex] = this.tiles[currTileIndex];
        this.tiles = labelsTemporary;
        this.tiles.filter( function( element, index ) {
            if (element.isEmpty) {
                this.emptyTileIndex = index;
                return;
            }
        }, this);
        console.log(this.tiles);

        if (this.interval === null) {
            this.interval = setInterval(() => { this.showTime(); }, 1000);
            this.elapsedTime = 0;
        }
        this.checkWin();

        return;
    }




    public checkWin() {
         for (let i = 0; i <= 14; i++) {
             if (+this.tiles[i].label != i + 1) {
                return false;
             }
         }
         console.log('You win!');
         clearInterval(this.interval);
         this.interval = null;
         return true;
    }

    public showTime() {

        this.elapsedTime++;
        if (this.elapsedTime == 180) {
            this.clockStateClass = 'slow';
        }
        let timeString = '';
        let h, m, s;
        s = this.elapsedTime % 60;
        m = Math.floor(this.elapsedTime / 60) % 60;
        h = Math.floor(this.elapsedTime / 3600);
        if (h) {
            timeString = h + ':';
        }
        if (h || m) {
            if (m < 10 && h > 0) {
                timeString += m;
            } else {
                timeString += m;
            }
        }
        if (s < 10) {
            timeString += '0:0' + s;
        } else {
            timeString += '0:' + s;
        }

        this.clock = timeString;
    }
    public newGame() {
        this.initialize();
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