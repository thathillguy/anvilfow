import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {addUnitToArmy, enableAbilityToSelectedUnit, loadAllAbilities, loadAllAbilitiesSuccess, loadAllUnits, loadAllUnitsSuccess, loadCoreRulesSuccess, removeUnitFromArmy, selectArmyUnit} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";
import { AbilityHelper } from '../../types/AbilityHelper';
import { ObjectFactory } from '../../types/ObjectFactory';
import { enableMapSet, produce } from 'immer';

enableMapSet();

export interface ArmyState {
  coreRules: Ability[],
  allUnits: UnitData[],
  allAbilities: Ability[],
  armyUnits: Map<number, Unit>,
  armyAbilities: Ability[],
  activeUnitID: number,
  modalData: any
}

export interface AppState {
  army: ArmyState
}

export const initialState: ArmyState = {
  coreRules: [],
  allUnits: [],
  allAbilities: [],
  armyUnits: new Map<number, Unit>(),
  armyAbilities: [],
  activeUnitID: -1,
  modalData: null,
}

const loadCoreRulesSuccessHandler = (state: ArmyState, action: any) => {
  console.log("In loadCoreRulesSuccessHandler: ", action)
  return {...state, coreRules: [...action.rules]}
}

const loadAllUnitsSuccessHandler = (state: ArmyState, action: any) => {
  console.log("In loadAllUnitsSuccessHandler: ", action)
  return {...state, allUnits: [...action.units]}
}
const loadAllAbilitesSuccessHandler = (state: ArmyState, action: any) => {
  console.log("In loadAllAbilitesSuccessHandler: ", action)
  return {...state, allAbilities: [...action.abilities]}
}

const addUnitToArmyHandler = (state: ArmyState, action: any) => {
  console.log("In addUnitToArmyHandler: ", action)
  ObjectFactory.unitCount++;
  return produce(state, draft => {
    draft.armyUnits.set(ObjectFactory.unitCount, ObjectFactory.createUnitFromData(action.unitToAdd, action.selectedLoadout))
  })
}

const removeUnitFromArmyHandler = (state: ArmyState, action: any) => {
  console.log("In removeUnitFromArmyHandler: ", action)
  return produce(state, draft => {
    draft.armyUnits.delete(action.unitToRemoveID)
  })
}

const selectArmyUnitHandler = (state: ArmyState, action: any) => {
  console.log("In selectArmyUnitHandler");
  return produce(state, draft => {
    if(state.armyUnits.get(action.selectedArmyUnitID)) {
      draft.activeUnitID = action.selectedArmyUnitID;
    } else {
      draft.activeUnitID = -1;
    }
  })
}

const enableAbilityToSelectedUnitHandler = (state: ArmyState, {targetAbility, newStatus} : {targetAbility: Ability, newStatus: boolean}) => {
  console.log("In enableAbilityToSelectedUnitHandler");
  if(state.armyUnits.get(state.activeUnitID)) {
    console.log("calling setAbilityStatus");
    let newSelectedUnit = AbilityHelper.setAbilityStatus(state.armyUnits.get(state.activeUnitID)!, targetAbility, newStatus);
    return {...state, selectedUnit: newSelectedUnit}
  }
  return {...state}
}

export const armyReducer = createReducer(
  initialState,
  on(loadCoreRulesSuccess, loadCoreRulesSuccessHandler),
  on(loadAllUnitsSuccess, loadAllUnitsSuccessHandler),
  on(loadAllAbilitiesSuccess, loadAllAbilitesSuccessHandler),
  on(addUnitToArmy, addUnitToArmyHandler),
  on(removeUnitFromArmy, removeUnitFromArmyHandler),
  on(selectArmyUnit, selectArmyUnitHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler),
);