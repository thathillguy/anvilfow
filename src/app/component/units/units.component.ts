import { Component, Input, OnInit } from '@angular/core';
import { Unit } from '../../../types/Unit';
import { UnitData } from '../../../types/UnitData';
import { AppComponent } from '../../app.component';
import s2dUnitData from '../../../../e2e/S2DUnits.json';
import { AbilityData } from '../../../types/AbilityData';

import s2dAbilityData from '../../../../e2e/S2DAllegianceAbilities.json';
import { Ability } from '../../../types/Ability';
import { Store } from '@ngrx/store';
import { selectUnit } from '../../store/app.actions';
import { ObjectFactory } from '../../../types/ObjectFactory';
import { AbilityHelper } from '../../../types/AbilityHelper';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.less']
})
export class UnitsComponent implements OnInit {

  units: Unit[] = new Array<Unit>();
  @Input() selectedUnit: Unit | null = null;

  constructor(private store: Store) {

    const myS2DUnitData: UnitData[] = AppComponent.readUnitJSON(s2dUnitData);
    const myKark: Unit = ObjectFactory.createUnitFromData(myS2DUnitData[0]);
    this.units.push(myKark);
    this.units.push(ObjectFactory.createUnitFromData(myS2DUnitData[1]));

    const myS2DAbilityData: AbilityData[] = AppComponent.readAbilityJSON(s2dAbilityData);
    const armyAbilities = AbilityHelper.createAbilityListFromData(myS2DAbilityData);
    const khorneGeneralAura = AbilityHelper.findAbilityByName("Aura of Khorne (General)", armyAbilities);
    if(khorneGeneralAura) {
      AbilityHelper.addAbilityToUnit(khorneGeneralAura, myKark);
    }

  }

  ngOnInit(): void {

  }

  ngOnChanges() : void {
    console.log(` ngOnChanges in units: ${this.selectedUnit}`)
  }

  onSelect(unit: Unit) {
    //this.selectedUnit = unit;
    console.log("select 1");
    this.store.dispatch(selectUnit({selectedUnit: unit}));
    console.log("select 2");
  }

}
