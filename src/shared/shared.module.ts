import { NgModule } from '@angular/core';
import { FinishGamePopupComponent } from 'shared-module/components/finish-game-popup/finish-game-popup.component';
import { RootRoutingModule } from 'core-module/root-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MODULES = [
  RootRoutingModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  declarations: [
    FinishGamePopupComponent
  ],
  entryComponents: [
    FinishGamePopupComponent
  ],
})
export class SharedModule { }
