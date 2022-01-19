import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./component/header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from "./component/searchbar/searchbar.component";
import { HomeView} from "./view/home/home.view";
import {BannerComponent} from "./component/banner/banner.component";
import {CarouselComponent} from "./component/carousel/carousel.component";
import { StoreModule } from '@ngrx/store';
import { armyReducer } from './store/app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    HomeView,
    BannerComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(armyReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
