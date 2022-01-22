import { Component, OnInit } from '@angular/core';
import { UnitData } from '../types/UnitData';
import { Unit } from '../types/Unit';
import { AbilityData } from '../types/AbilityData';
import { Ability } from '../types/Ability';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState, ArmyState} from "./store/app.reducer";
import {loadAllUnits} from "./store/app.actions";
import { selectActiveUnit, selectAllUnits } from './store/app.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'anvilfow';
  allUnitData$: Observable<UnitData[]>

  constructor(private store: Store<AppState>) {
    this.allUnitData$ = store.pipe(
      select(selectAllUnits),
    )
    this.allUnitData$.subscribe(
      data => {console.log("YO", data)}
    )

    this.selectedUnit$ = store.select(selectActiveUnit);
    this.selectedUnit$.subscribe(unit => {console.log(`App Top Level: Subscribed to ${unit}`)});
  }

  ngOnInit() {
    console.log("onInit AppComponent");
    this.store.dispatch(loadAllUnits())

  }

  //allUnitData$: Observable<UnitData[]>

 selectedUnit$: Observable<Unit | null>;

  static readUnitJSON(jsonToRead: any): UnitData[] {
    const unitData: UnitData[] = <UnitData[]>jsonToRead;
    return unitData;
  }

  static readAbilityJSON(jsonToRead: any): AbilityData[] {
    const abilityData: AbilityData[] = <AbilityData[]>jsonToRead;
    return abilityData;
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
