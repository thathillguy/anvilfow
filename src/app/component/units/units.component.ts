import { Component, Input, OnInit } from '@angular/core';
import { Unit } from '../../../types/Unit';
import { UnitData } from '../../../types/UnitData';
import { AppComponent } from '../../app.component';
import s2dUnitData from '../../../../e2e/S2DUnits.json';

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

  @Input() units: UnitData[] | null = [];
  @Input() abilityData: Ability[] | null = [];
  @Input() activeUnit: Unit | null = null;
  
  
  myUnits: Unit[] = new Array<Unit>();


  loadedUnits: boolean = false;

  constructor(private store: Store) {
    console.log(`UnitsComponent Constructor: units is ${this.units}`);

    //const myS2DUnitData: UnitData[] = AppComponent.readUnitJSON(s2dUnitData);

    /*const myS2DAbilityData: AbilityData[] = AppComponent.readAbilityJSON(s2dAbilityData);
    const armyAbilities = AbilityHelper.createAbilityListFromData(myS2DAbilityData);
    const khorneGeneralAura = AbilityHelper.findAbilityByName("Aura of Khorne (General)", armyAbilities);
    if(khorneGeneralAura) {
      AbilityHelper.addAbilityToUnit(khorneGeneralAura, myKark);
    }*/

  }

  ngOnInit(): void {
    //console.log(this.units)
  }

  ngOnChanges() : void {
    console.log(` ngOnChanges in UnitsComponent: units is ${this.units}`)
    if(this.units && this.abilityData && this.abilityData.length > 0 && !this.loadedUnits){
      console.log(` DING DONG DING DONG`);
      let myKark: Unit = ObjectFactory.createUnitFromData(this.units[0]);
      this.myUnits.push(myKark);
      console.log(` KARK DONE`);
      this.myUnits.push(ObjectFactory.createUnitFromData(this.units[1]));
      console.log(` FOMORID DONE`);
      this.myUnits.push(ObjectFactory.createUnitFromData(this.units[2]));


      console.log(` abilityData: ${JSON.stringify(this.abilityData)}`);
      const khorneGeneralAura = AbilityHelper.findAbilityByName("Aura of Khorne (General)", this.abilityData);

      console.log(` KHORNE AURA?? ${khorneGeneralAura}`);

      if(khorneGeneralAura) {
        myKark = AbilityHelper.addAbilityToUnit(khorneGeneralAura, myKark);
        console.log(`Aura on Kark? ${JSON.stringify(this.myUnits)}`)
      }

      this.loadedUnits = true;
    }
  }

  onSelect(unit: Unit) {
    this.store.dispatch(selectUnit({selectedUnit: unit}));
  }

}
