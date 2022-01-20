import {UnitData} from "../../types/UnitData";
import {AbilityData} from "../../types/AbilityData";
import allUnitData from '../../../e2e/S2DUnits.json';
import allAbilityData from '../../../e2e/S2DAllegianceAbilities.json';
import { Observable } from "rxjs";


export class UnitService {
  constructor() { }

  readUnitJSON(): Observable<UnitData[]> {
    const data: UnitData[] = <UnitData[]>allUnitData
    return new Observable(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    });
  }

  readAbilityJSON(): Observable<AbilityData[]> {
    const data: AbilityData[] = <AbilityData[]>allAbilityData;
    return new Observable(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    });
  }
}
