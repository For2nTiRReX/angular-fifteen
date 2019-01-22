import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MODAL_ANIMATION } from 'shared-module/animations/animations';
import { ModalService } from 'shared-module/services/modal.service';

@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [MODAL_ANIMATION]
})
export class AppComponent implements OnInit {

  public routePath: string;

  constructor(public modalService: ModalService, private router: Router, public renderer: Renderer2) {
    modalService.renderer = renderer;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.routePath = event.url;
      }
    });
  }

  public removeModal() {
    this.modalService.destroy();
  }

}
