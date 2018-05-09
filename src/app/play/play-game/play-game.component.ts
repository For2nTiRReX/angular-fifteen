import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';

export class Tile {

    public id: number;
    public label: string;
    public positionTop: number;
    public positionLeft: number;
    public isEmpty: boolean;

    constructor(id, label, positionTop, positionLeft, isEmpty = false) {
        this.id = id;
        this.label = label;
        this.positionTop = positionTop;
        this.positionLeft = positionLeft;
        this.isEmpty = isEmpty;
    }
}

@Component({
    selector: 'fifteen-play-game',
    templateUrl: './play-game.component.html',
    styleUrls: ['./play-game.component.scss']
})


export class PlayGameComponent implements OnInit {

    grid: any;
    scramble: any;
    clock: any;
    cells: any;
    index: any;
    wait: any;
    elapsedTime: any;
    interval: any;
    emptycell: any;
    labels: Array<Tile>;
    labelsFront: Array<string>;
    tileWidth: number;
    tileHeight: number;
    tileGap: number;
    containerWidth: number;
    animationClass: string;
    animationTarget: number;

    constructor() { }

    ngOnInit() {
        /*this.grid = document.getElementById('grid');
        this.scramble = document.getElementById('scramble');
        this.clock = document.getElementById('clock');
        this.scramble.addEventListener('click', this.initialize);
        this.index = null;
        this.wait = true;
        this.elapsedTime = null;*/
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

    public initialize() {
        let labelsInit = [];
        this.labels = [];
        this.containerWidth = 600;
        this.tileGap = 6;
        this.tileWidth = this.containerWidth / 4;
        this.tileHeight = this.containerWidth / 4;
        this.animationClass = '';
        //this.clock.innerHTML = '';
        //this.clock.className = '';
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;

        for (let i = 0; i <= 14; i++) {
            labelsInit[i] = i + 1 + '';
        }
        labelsInit[15] = '';
        let parity = this.shuffle(labelsInit);
        this.emptycell = labelsInit.indexOf('');
        parity += this.emptycell + Math.floor(this.emptycell / 4);

        // Switch labels if necessary to guarantee that a solution exists.
        // See https://en.wikipedia.org/wiki/15_puzzle#Solvability
        if (parity % 2) { this.exchange(labelsInit, 0, 2); }

        let k = 0;
        for (let i = 0; i < labelsInit.length / 4; i++) {
            for (let j = 0;j < labelsInit.length / 4; j++) {
                this.labels[k] = new Tile(k, labelsInit[k], i * this.tileHeight , j * this.tileWidth,labelsInit[k] === '' ? true : false);
                k++;
            }
        }
        //console.log(this.labels);

    }


    public swapArrayElements(a, x, y) {
        if (a.length === 1) return a;
        a.splice(y, 1, a.splice(x, 1, a[y])[0]);
        return a;
    };

    public makeMove(direction) {
        this.animationClass = direction;
        console.log(direction);
    }

    public clickTile(event, label) {
        const currTileIndex = this.labels.indexOf(label);
        let labelsTemporary = [];
        labelsTemporary = this.labels.slice();

        this.animationTarget = currTileIndex;
        /*if (currTileIndex - 1 === this.emptycell && (currTileIndex % 4) !== 0) {
            this.makeMove('slideleft');
        }
        else if (currTileIndex + 1 === this.emptycell && (currTileIndex % 4) !== 3) {
            this.makeMove('slideright');
        }
        else if (currTileIndex - 4 === this.emptycell) {
            this.makeMove('slideup');
        }
        else if (currTileIndex + 4 === this.emptycell) {
            this.makeMove('slidedown');
        }
        else {
            return;
        }*/
        console.log(this.labels);
        labelsTemporary[currTileIndex] = this.labels[this.emptycell];
        labelsTemporary[this.emptycell] = this.labels[currTileIndex];
        this.labels = labelsTemporary;
        console.log(this.labels);
        /*console.log(this.emptycell);
        console.log(label);
        console.log(event);*/

        /*this.labels[this.emptycell] = label;
        this.labels[currTileIndex] = '';
        this.emptycell = currTileIndex;*/

        return;

    }

    public doSlide(direction) {
        this.cells[this.emptycell].className = 'cell hidden';
        this.cells[this.index].className = 'cell slide' + direction;
        setTimeout(this.swap, 400);
        if (this.interval === null) {
            this.interval = setInterval(this.showTime, 1000);
            this.elapsedTime = 0;
        }
        return true;
    }

    public swap() {
        this.cells[this.emptycell].innerHTML = this.cells[this.index].innerHTML;
        this.cells[this.emptycell].className = 'cell';
        this.cells[this.index].innerHTML = '';
        this.cells[this.index].className = 'cell blank';
        this.emptycell = this.index;
        this.wait = this.checkWin();
    }

    public checkWin() {
        /*for (let i = 0; i <= 14; i++) {
         if (this.cells[i].innerHTML != i + 1) {
         return false;
         }
         }
         clearInterval(this.interval);
         this.interval = null;
         this.cells[this.emptycell].className = 'cell blank winner';
         return true;*/
    }

    public showTime() {
        this.elapsedTime++;
        if (this.elapsedTime == 180) {
            this.clock.className = 'slow';
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
                timeString += '0' + m;
            } else {
                timeString += m;
            }
        }
        if (s < 10) {
            timeString += ':0' + s;
        } else {
            timeString += ':' + s;
        }


        this.clock.innerHTML = timeString;
    }

}