import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'core-module/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from 'core-module/components/home/home.component';
import { SharedModule } from 'shared-module/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
