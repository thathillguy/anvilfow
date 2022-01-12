import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./component/header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SearchbarComponent} from "./component/searchbar/searchbar.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
