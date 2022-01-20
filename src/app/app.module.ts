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
import { UnitDetailComponent } from './component/unit-detail/unit-detail.component';
import { UnitsComponent } from './component/units/units.component';
import { AbilityDetailComponent } from './component/ability-detail/ability-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    HomeView,
    BannerComponent,
    CarouselComponent,
	  UnitDetailComponent,
    UnitsComponent,
    AbilityDetailComponent
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
