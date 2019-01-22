import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
export const MODAL_ANIMATION = trigger('modalState', [
    state('inactive', style({
        opacity: '0.4',
        display: 'none'
    })),
    transition('inactive => active', [
        animate('500ms ease-in', style({opacity: '1', display: 'block'}))
    ]),
    transition('active => inactive', [
        animate('100ms ease-in', style({opacity: '0.4', display: 'none'}))
    ])
]);
