import {Component, OnInit, Renderer2} from '@angular/core';
import { ModalService } from './services/modal.service';
import {FinishGameComponent} from './popup-components/finish-game/finish-game.component';
import { Router, NavigationStart } from '@angular/router';
import { MODAL_ANIMATION } from './animations/animations';

@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [MODAL_ANIMATION]
})
export class AppComponent implements OnInit {

  public routePath: string;

  constructor(private modalService: ModalService, private router: Router, renderer: Renderer2) {
      modalService.renderer = renderer;
  }
  ngOnInit () {
    this.router.events.subscribe(event => {
      if( event instanceof NavigationStart ) {
        this.routePath = event.url;
      }
    });
  }

  public removeModal() {
      this.modalService.destroy();
  }

}
