import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fifteen-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
/*
  public id: number;
  public positionOnBoard: number;
  public label: string;
  public positionTop: number;
  public positionLeft: number;
  public tileWidth: number;
  public tileHeight: number;
  public tileGap: number;

  @Input() tile: Tile;
  @Input() containerWidth: number;
  @Input() emptyTileIndex: number;
  @Output() moveEmitter = new EventEmitter<Number>();

  ngOnInit() {
    this.tileGap = this.tileHeight * 4 / 100;
    ({id: this.id, label: this.label, positionOnBoard: this.positionOnBoard, positionTop: this.positionTop, positionLeft: this.positionLeft} = this.tile);
    console.log(this.tile, this.positionLeft, this.positionTop, this.tileGap);
  }
  
  triggerMove($event): void {
    console.log($event);
    this.moveEmitter.emit(this.id);
  }

  moveTile(x: number, y: number): void {
    this.positionLeft = this.positionLeft + x;
    this.positionTop = this.positionTop + y;
  }

  isRightPosition(): boolean {
    return this.positionOnBoard + 1 === +this.label;
  }


*/
}
