import { NgModule } from '@angular/core';
import { FinishGamePopupComponent } from 'shared-module/components/finish-game-popup/finish-game-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecondsToHoursPipe } from 'shared-module/pipes/seconds-to-hours.pipe';
import { RouterModule } from '@angular/router';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    SecondsToHoursPipe,
    FinishGamePopupComponent
  ],
  declarations: [
    FinishGamePopupComponent,
    SecondsToHoursPipe
  ],
  entryComponents: [
    FinishGamePopupComponent
  ],
})
export class SharedModule { }
