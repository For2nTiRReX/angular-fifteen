import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';


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
  labels: Array<string>;

  constructor() { }

  ngOnInit() {
    this.grid = document.getElementById('grid');
    this.scramble = document.getElementById('scramble');
    this.clock = document.getElementById('clock');
    //this.grid.addEventListener('click', this.clickTile);
    this.scramble.addEventListener('click', this.initialize);
    this.index = null;
    this.wait = true;
    this.elapsedTime = null;
    this.initialize();
  }


  public initialize() {
      this.clock.innerHTML = '';
      this.clock.className = '';
      if (this.interval !== null) {
          clearInterval(this.interval);
      }
      this.interval = null;
      this.labels = [];
      for (let i = 0; i <= 14; i++) {
          this.labels[i] = i + 1 + '';
      }
      this.labels[15] = '';

      let parity = this.shuffle(this.labels);
      this.emptycell = this.labels.indexOf('');
      parity += this.emptycell + Math.floor(this.emptycell / 4);

      // Switch labels if necessary to guarantee that a solution exists.
      // See https://en.wikipedia.org/wiki/15_puzzle#Solvability
      if (parity % 2) { this.exchange(this.labels, 0, 2); }

      /*this.grid.innerHTML = '';
      for (let i = 0; i <= 15; i++) {
          const cell = document.createElement('div');
          cell.innerHTML = labels[i];
          if (labels[i] === '') {
              cell.className = 'cell blank';
          } else {
              cell.className = 'cell';
          }
          this.grid.appendChild(cell);
      }*/

      this.wait = this.checkWin();

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

  public makeMove(direction) {
      console.log(direction)
  }

  public clickTile(event, label) {
      console.log(this.labels);
      const nextEmtyTile = this.labels.indexOf(label);

      if (label - 1 === this.emptycell && (label % 4) !== 0) {
          this.makeMove('left');
      }
      if (label + 1 === this.emptycell && (label % 4) !== 3) {
          this.makeMove('right');
      }
      if (label - 4 === this.emptycell) {
          this.makeMove('up');
      }
      if (label + 4 === this.emptycell) {
          this.makeMove('down');
      }
      this.labels[this.emptycell] = label;
      this.labels[nextEmtyTile] = '';
      this.emptycell = nextEmtyTile;

      return;

      this.cells = this.grid.children;
      if (this.wait) { return false; }
      for (let i = 0; i < this.cells.length; i++) {
          if (event.target === this.cells[i]) {
              this.index = i;
              this.wait = this.slideLeft() || this.slideRight() || this.slideUp() || this.slideDown();
          }
      }
  }

  public slideLeft() {
      if (this.index - 1 === this.emptycell && (this.index % 4) !== 0) {
          return this.doSlide('left');
      }
  }

  public slideRight() {
      if (this.index + 1 === this.emptycell && (this.index % 4) !== 3) {
          return this.doSlide('right');
      }
  }

  public slideUp() {
      if (this.index - 4 === this.emptycell) {
          return this.doSlide('up');
      }
  }

  public slideDown() {
      if (this.index + 4 === this.emptycell) {
          return this.doSlide('down');
      }
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
