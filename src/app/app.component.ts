import { Component, OnInit } from '@angular/core';
import { UnitData } from '../types/unitData';
import { Unit } from '../types/Unit';
import { AbilityData } from '../types/AbilityData';
import { Ability } from '../types/Ability';
import { Observable } from 'rxjs';

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
    const myS2DUnitData: UnitData[] = readUnitJSON(s2dUnitData);
    const myS2DAbilityData: AbilityData[] = readAbilityJSON(s2dAbilityData);

    const myUnits = new Array<Unit>();
    const myKarkadrak = new Unit(myS2DUnitData[0]);
    myUnits.push(myKarkadrak);
    const myFomoroid = new Unit(myS2DUnitData[1]);
    myUnits.push(myFomoroid);

    console.log("Initial");
    console.log(myKarkadrak.warscroll());

    const armyAbilities = Ability.createAbilityListFromData(myS2DAbilityData);
    const khorneAura = Ability.findAbilityByName("Aura of Khorne", armyAbilities);
    const khorneGeneralAura = Ability.findAbilityByName("Aura of Khorne (General)", armyAbilities);
    if(khorneAura) {
      myKarkadrak.addAbility(khorneAura);
      console.log("With Aura");
      console.log(myKarkadrak.warscroll());

      myKarkadrak.setAbilityStatus(khorneAura, true);
      console.log("With Aura Activated");
      console.log(myKarkadrak.warscroll());

      myKarkadrak.setAbilityStatus(khorneAura, false);
      console.log("With Aura Deactivated");
      console.log(myKarkadrak.warscroll());
    }

    if(khorneGeneralAura) {
      myKarkadrak.addAbility(khorneGeneralAura);
      console.log("With General Aura");
      console.log(myKarkadrak.warscroll());

      myKarkadrak.setAbilityStatus(khorneGeneralAura, true);
      console.log("With General Aura Activated");
      console.log(myKarkadrak.warscroll());

      myKarkadrak.setAbilityStatus(khorneGeneralAura, false);
      console.log("With General Aura Activated");
      console.log(myKarkadrak.warscroll());
    }

    const phaseAllAbilities = Ability.findAbiliesInPhase("ALL", armyAbilities, myUnits);
    const phaseGameStartAbilities = Ability.findAbiliesInPhase("GAMESTART", armyAbilities, myUnits);
    const phaseHeroStartAbilities = Ability.findAbiliesInPhase("HEROSTART", armyAbilities, myUnits);
    const phaseInHeroAbilities = Ability.findAbiliesInPhase("INHERO", armyAbilities, myUnits);
    const phaseHeroEndAbilities = Ability.findAbiliesInPhase("HEROEND", armyAbilities, myUnits);
    const phaseMoveStartAbilities = Ability.findAbiliesInPhase("MOVESTART", armyAbilities, myUnits);
    const phaseInMoveAbilities = Ability.findAbiliesInPhase("INMOVE", armyAbilities, myUnits);
    const phaseMoveEndAbilities = Ability.findAbiliesInPhase("MOVEEND", armyAbilities, myUnits);
    const phaseShootStartAbilities = Ability.findAbiliesInPhase("SHOOTSTART", armyAbilities, myUnits);
    const phaseInShootAbilities = Ability.findAbiliesInPhase("INSHOOT", armyAbilities, myUnits);
    const phaseShootEndAbilities = Ability.findAbiliesInPhase("SHOOTEND", armyAbilities, myUnits);
    const phaseChargeStartAbilities = Ability.findAbiliesInPhase("CHARGESTART", armyAbilities, myUnits);
    const phaseInChargeAbilities = Ability.findAbiliesInPhase("INCHARGE", armyAbilities, myUnits);
    const phaseChargeEndAbilities = Ability.findAbiliesInPhase("CHARGEEND", armyAbilities, myUnits);
    const phaseCombatStartAbilities = Ability.findAbiliesInPhase("COMBATSTART", armyAbilities, myUnits);
    const phaseInCombatAbilities = Ability.findAbiliesInPhase("INCOMBAT", armyAbilities, myUnits);
    const phaseCombatEndAbilities = Ability.findAbiliesInPhase("COMBATEND", armyAbilities, myUnits);
    const phaseBattleshockStartAbilities = Ability.findAbiliesInPhase("BSHOCKSTART", armyAbilities, myUnits);
    const phaseInBattleshockAbilities = Ability.findAbiliesInPhase("INBSHOCK", armyAbilities, myUnits);
    const phaseBattleshockEndAbilities = Ability.findAbiliesInPhase("BSHOCKEND", armyAbilities, myUnits);

    printAbilities("--Always Active--", phaseAllAbilities);
    printAbilities("--Game Start--", phaseGameStartAbilities);
    printAbilities("--Start of the Hero Phase--", phaseHeroStartAbilities);
    printAbilities("--In the Hero Phase--", phaseInHeroAbilities);
    printAbilities("--End of the Hero Phase--", phaseHeroEndAbilities);
    printAbilities("--Start of the Movement Phase--", phaseMoveStartAbilities);
    printAbilities("--In the Movement Phase--", phaseInMoveAbilities);
    printAbilities("--End of the Movement Phase--", phaseMoveEndAbilities);
    printAbilities("--Start of the Shooting Phase--", phaseShootStartAbilities);
    printAbilities("--In the Shooting Phase--", phaseInShootAbilities);
    printAbilities("--End of the Shooting Phase--", phaseShootEndAbilities);
    printAbilities("--Start of the Charge Phase--", phaseChargeStartAbilities);
    printAbilities("--In the Charge Phase--", phaseInChargeAbilities);
    printAbilities("--End of the Charge Phase--", phaseChargeEndAbilities);
    printAbilities("--Start of the Combat Phase--", phaseCombatStartAbilities);
    printAbilities("--In the Charge Phase--", phaseInCombatAbilities);
    printAbilities("--End of the Charge Phase--", phaseCombatEndAbilities);
    printAbilities("--Start of the Battleshock Phase--", phaseBattleshockStartAbilities);
    printAbilities("--In the Battleshock Phase--", phaseInBattleshockAbilities);
    printAbilities("--End of the Battleshock Phase--", phaseBattleshockEndAbilities);
  }
}

function readUnitJSON(jsonToRead: any): UnitData[] {
  const unitData: UnitData[] = <UnitData[]>jsonToRead;
  return unitData;
}

function readAbilityJSON(jsonToRead: any): AbilityData[] {
  const abilityData: AbilityData[] = <AbilityData[]>jsonToRead;
  return abilityData;
}

function printAbilities(title: string, abilities: Ability[]){
  if(abilities.length > 0) {
    console.log(title);
    for (const element of abilities) {
      console.log(element.toString());
    }
  }
}
