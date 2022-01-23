import { Component, OnInit } from '@angular/core';
import { UnitData } from '../types/UnitData';
import { Unit } from '../types/Unit';
import { AbilityData } from '../types/AbilityData';
import { Ability } from '../types/Ability';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState, ArmyState} from "./store/app.reducer";
import {loadAllUnits, loadAllAbilities} from "./store/app.actions";
import { selectActiveUnit, selectAllUnits } from './store/app.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'anvilfow';
  allUnitData$: Observable<UnitData[]>
  activeUnit$: Observable<Unit | null>;

  constructor(private store: Store<AppState>) {
    this.allUnitData$ = store.pipe(
      select(selectAllUnits),
    )
    this.allUnitData$.subscribe(
      data => {console.log("YO", data)}
    )

    this.activeUnit$ = store.select(selectActiveUnit);
    this.activeUnit$.subscribe(unit => {console.log(`App Top Level: Subscribed to ${unit}`)});
  }

  ngOnInit() {
    console.log("onInit AppComponent");
    this.store.dispatch(loadAllUnits())
    this.store.dispatch(loadAllAbilities())

  }

}

function printAbilities(title: string, abilities: Ability[]){
  if(abilities.length > 0) {
    console.log(title);
    for (const element of abilities) {
      console.log(element.toString());
    }
  }
}
