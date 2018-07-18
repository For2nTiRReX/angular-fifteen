import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Renderer2 } from '@angular/core';

@Injectable()
export class ModalService {

    public modalState: string;
    public renderer: Renderer2;

    private modalElementId: string;
    private overlayElementId: string;
    private container: HTMLElement;
    private overlay: HTMLElement;

    constructor(private domService: DomService) {
        this.modalElementId  = 'modal-container';
        this.overlayElementId = 'overlay';
        this.modalState = 'inactive';
    }

    init(component: any, inputs: object, outputs: object) {
        this.domService.renderer = this.renderer;
        let componentConfig = {
            inputs:inputs,
            outputs:outputs
        }
        //this.container = this.renderer.selectRootElement('#' + this.modalElementId);
        //this.overlay = this.renderer.selectRootElement('#' + this.overlayElementId);
        //this.renderer.setAttribute(this.container, 'class', 'show' );
        //this.renderer.setAttribute(this.overlay, 'class', 'show' );
        this.modalState = 'active';
        this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
    }

    destroy() {
        this.modalState = 'inactive';
        this.domService.removeComponent();
        //this.renderer.setAttribute(this.container, 'class', 'hidden' );
        //this.renderer.setAttribute(this.overlay, 'class', 'hidden' );
    }
}
