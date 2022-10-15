import {UnitData} from "../../types/UnitData";
import coreRuleData from '../../../e2e/CoreRules.json';
import allUnitData from '../../../e2e/S2DUnits.json';
import allAbilityData from '../../../e2e/S2DAllegianceAbilities.json';
import { Observable } from "rxjs";
import { Ability } from "../../types/Ability";


export class UnitService {
  constructor() { }

  readRuleJSON(): Observable<Ability[]> {
    const data: Ability[] = <Ability[]>coreRuleData
    return new Observable(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    });
  }

  readUnitJSON(): Observable<UnitData[]> {
    const data: UnitData[] = <UnitData[]>allUnitData
    return new Observable(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    });
  }

  readAbilityJSON(): Observable<Ability[]> {
    const data: Ability[] = <Ability[]>allAbilityData;
    return new Observable(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    });
  }
}
