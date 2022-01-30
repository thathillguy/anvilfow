import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {enableAbilityToSelectedUnit, loadAllAbilities, loadAllAbilitiesSuccess, loadAllUnits, loadAllUnitsSuccess, selectUnit} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";
import { AbilityHelper } from '../../types/AbilityHelper';

export interface ArmyState {
  allUnits: UnitData[],
  allAbilities: Ability[]
  army: {
    units: Unit[],
    abilities: Ability[]
  },
  selectedUnit: Unit | null,
  modalData: any
}

export interface AppState {
  army: ArmyState
}

export const initialState: ArmyState = {
  allUnits: [],
  allAbilities: [],
  army: {units: [], abilities: []},
  selectedUnit: null,
  modalData: null,
}

const loadAllUnitsSuccessHandler = (state: ArmyState, action: any) => {
  console.log("In loadAllUnitsSuccessHandler: ", action)
  return {...state, allUnits: [...action.units]}
}
const loadAllAbilitesSuccessHandler = (state: ArmyState, action: any) => {
  console.log("In loadAllAbilitesSuccessHandler: ", action)
  return {...state, allAbilities: [...action.abilities]}
}

const selectUnitHandler = (state: ArmyState, {selectedUnit} : {selectedUnit: Unit}) => {
  console.log("In selectUnitHandler");
  return {...state, selectedUnit: selectedUnit};
}

const enableAbilityToSelectedUnitHandler = (state: ArmyState, {targetAbility, newStatus} : {targetAbility: Ability, newStatus: boolean}) => {
  console.log("In enableAbilityToSelectedUnitHandler");
  if(state.selectedUnit) {
    console.log("calling setAbilityStatus");
    let newSelectedUnit = AbilityHelper.setAbilityStatus(state.selectedUnit, targetAbility, newStatus);
    return {...state, selectedUnit: newSelectedUnit}
  }
  return {...state}
}

/*export function armyReducer(state: ArmyState, action) {
  return _armyReducer(state, action);
}*/

export const armyReducer = createReducer(
  initialState,
  on(loadAllUnitsSuccess, loadAllUnitsSuccessHandler),
  on(loadAllAbilitiesSuccess, loadAllAbilitesSuccessHandler),
  on(selectUnit, selectUnitHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler),
);