import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootRoutingModule } from './root-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
  ],
  imports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
