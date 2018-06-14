import {Component, OnInit} from '@angular/core';
import { ModalService } from './services/modal.service';
import {FinishGameComponent} from './popup-components/finish-game/finish-game.component';



@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private modalService: ModalService) {}
  ngOnInit () {
  }

  private removeModal() {
      this.modalService.destroy();
  }

}
