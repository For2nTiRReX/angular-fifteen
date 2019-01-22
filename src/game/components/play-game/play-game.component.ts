import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeCounterComponent } from 'game-module/components/time-counter/time-counter.component';
import { PointsServiceService } from 'shared-module/services/points-service.service';
import { ModalService } from 'shared-module/services/modal.service';
import { FinishGamePopupComponent } from 'shared-module/components/finish-game-popup/finish-game-popup.component';
import { GameBoardConfig } from 'assets/board-config';
import { GameBoardComponent } from '../game-board/game-board.component';


@Component({
    selector: 'fifteen-play-game',
    templateUrl: './play-game.component.html',
    styleUrls: ['./play-game.component.scss']
})


export class PlayGameComponent implements OnInit {

    movesCounter: number;
    isGameActive: boolean;
    @ViewChild(TimeCounterComponent) timerComponent: TimeCounterComponent;
    @ViewChild(GameBoardComponent) gameBoardComponent: GameBoardComponent;


    constructor(private pointsServiceService: PointsServiceService, private modalService: ModalService) { }

    ngOnInit() {
        this.movesCounter = 0;
        this.newGame();
    }

    public newGame() {
        this.movesCounter = 0;
        this.timerComponent.reset();
        this.isGameActive = true;
        this.timerComponent.start();
        this.gameBoardComponent.initBoard();
    }

    public toggleActiveGame(): boolean {
        this.isGameActive = !this.isGameActive;
        this.timerComponent.toggleState(this.isGameActive);
        return this.isGameActive;
    }

    public incrementMoveCounter(event) { 
        this.movesCounter++;
    }

    public setPlayerResult(event) {
        this.pointsServiceService.setNewResult(this.movesCounter, this.timerComponent.getTimeSeconds());
        this.modalService.init(FinishGamePopupComponent, {moves: this.movesCounter, time: this.timerComponent.getTimeSeconds()}, {});
    }

}