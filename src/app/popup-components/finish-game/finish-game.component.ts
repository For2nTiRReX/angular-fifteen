import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'fifteen-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {


  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.destroy();
  }

}
