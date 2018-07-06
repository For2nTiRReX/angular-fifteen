import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import {FinishGameComponent} from './popup-components/finish-game/finish-game.component';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private routePath: string;

  constructor(private modalService: ModalService, private router: Router) {}
  ngOnInit () {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.routePath = event.url;
      }
    });
  }

  private removeModal() {
      this.modalService.destroy();
  }

}
