import { Component, OnInit } from '@angular/core';
import { UnitData } from '../types/UnitData';
import { Unit } from '../types/Unit';
import { Ability } from '../types/Ability';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState, ArmyState} from "./store/app.reducer";
import {loadAllUnits, loadAllAbilities} from "./store/app.actions";
import { selectActiveUnitID, selectAllAbilities, selectAllUnits, selectArmyUnits } from './store/app.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'anvilfow';
  armyUnits$:  Observable<Map<number, Unit>>
  allUnitData$: Observable<UnitData[]>
  allAbilityData$: Observable<Ability[]>
  activeUnitID$: Observable<number | null>;

  constructor(private store: Store<AppState>) {
    //Select and subscribe for Unit Data
    this.allUnitData$ = store.pipe(
      select(selectAllUnits),
    )
    this.allUnitData$.subscribe(
      data => {console.log("YO", data)}
    )

    //Select and subscribe for Ability Data
    this.allAbilityData$ = store.pipe(
      select(selectAllAbilities),
    )
    this.allAbilityData$.subscribe(
      data => {console.log("YO2", data)}
    )

    //Select and subscribe for Army Units
    this.armyUnits$ = store.select(selectArmyUnits);
    this.armyUnits$.subscribe(unit => {console.log(`App Top Level: Subscribed to ${this.armyUnits$}`)});

    //Select and subscribe for Active Unit
    this.activeUnitID$ = store.select(selectActiveUnitID);
    this.activeUnitID$.subscribe(unit => {console.log(`App Top Level: Subscribed to ${unit}`)});
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
