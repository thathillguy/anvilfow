import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {enableAbilityToSelectedUnit, loadAllAbilities, loadAllUnits, loadAllUnitsSuccess, selectUnit} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";
import { AbilityHelper } from '../../types/AbilityHelper';
import {AbilityData} from "../../types/AbilityData";

export interface ArmyState {
  allUnits: UnitData[],
  allAbilities: AbilityData[]
  army: {
    units: Unit[],
    abilities: AbilityData[]
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
  console.log("HERE: ", action)
  return {...state, allUnits: [...action.units]}
}
const loadAllAbilitesSuccessHandler = (state: ArmyState, action: any) => {
  console.log("HERE: ", action)
  return {...state, allAbilities: [...action.abilities]}
}

const selectUnitHandler = (state: ArmyState, {selectedUnit} : {selectedUnit: Unit}) => {
  console.log("selectUnitHandler");
  return {...state, selectedUnit: selectedUnit};
}

const enableAbilityToSelectedUnitHandler = (state: ArmyState, {targetAbility, newStatus} : {targetAbility: Ability, newStatus: boolean}) => {
  console.log("enableAbilityToSelectedUnitHandler");
  if(state.selectedUnit) {
    console.log("setAbilityStatus");
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
  on(loadAllAbilities, loadAllAbilitesSuccessHandler),
  on(selectUnit, selectUnitHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler),
);