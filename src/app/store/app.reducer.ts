import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {enableAbilityToSelectedUnit, loadAllUnits, selectUnit} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";
import { AbilityHelper } from '../../types/AbilityHelper';

export interface ArmyState {
  allUnits: UnitData[],
  armyUnits: Unit[],
  selectedUnit: Unit | null,
  modalData: any
}

export interface AppState {
  army: ArmyState
}

export const initialState: ArmyState = {
  allUnits: [],
  armyUnits: [],
  selectedUnit: null,
  modalData: null,
}

const loadAllUnitsHandler = (state: ArmyState) => {
  return state
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

export const armyReducer = createReducer(
  initialState,
  on(loadAllUnits, loadAllUnitsHandler),
  on(selectUnit, selectUnitHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler)
);


/*export function armyReducer(state: ArmyState, action) {
  return _armyReducer(state, action);
}*/
