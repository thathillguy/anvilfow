import { Component, OnInit } from '@angular/core';
import { UnitData } from '../types/unitData';
import { AbilityData } from '../types/AbilityData';

import s2dUnitData from '../../e2e/S2DUnits.json';
import s2dAbilityData from '../../e2e/S2DAllegianceAbilities.json';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'anvilfow';

  ngOnInit() {
    console.log("onInit AppComponent");
    readUnitJSON(s2dUnitData);
    readAbilityJSON(s2dAbilityData);
  }
}

function readUnitJSON(jsonToRead: any) {
  const unitData: UnitData[] = <UnitData[]>jsonToRead;
  const unitName = unitData[0].unitName;
  console.log(unitName);
  console.log(unitData[0].meleeWeapons);
  console.log(unitData[0].abilities);
  console.log("---");
  console.log(unitData[1].unitName);
  console.log(unitData[1].meleeWeapons);
  console.log(unitData[1].abilities);
}

function readAbilityJSON(jsonToRead: any) {
  const abilityData: AbilityData[] = <AbilityData[]>jsonToRead;
  const abilityName = abilityData[0].abilityName;
  console.log(abilityName);
  console.log(abilityData[0].abilityFullText);
  console.log("---");
  console.log(abilityData[1].abilityName);
  console.log(abilityData[1].abilityFullText);
}
