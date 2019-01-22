import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'shared-module/services/modal.service';

@Component({
  selector: 'fifteen-finish-game',
  templateUrl: './finish-game-popup.component.html',
  styleUrls: ['./finish-game-popup.component.scss']
})
export class FinishGamePopupComponent implements OnInit {

  @Input() moves: any;
  @Input() time: any;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    //console.log(this.moves,this.time);
  }

  closeModal() {
    this.modalService.destroy();
  }

}
