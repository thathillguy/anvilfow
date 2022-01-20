import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {enableAbilityToSelectedUnit, loadAllAbilities, loadAllUnits, loadAllUnitsSuccess} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";

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

const initialState: ArmyState = {
  allUnits: [],
  allAbilities: [],
  army: {units: [], abilities: []},
  selectedUnit: null,
  modalData: null,
}

const loadAllUnitsSuccessHandler = (state: ArmyState, action: any) => {
  console.log("HERE: ", action)
  return {...state, allUnits: action.units}
}
const loadAllAbilitiesHandler = (state: ArmyState) => {
  return state
}
const enableAbilityToSelectedUnitHandler = (state: ArmyState, {targetAbility, newStatus} : {targetAbility: Ability, newStatus: boolean}) => {
  return state
}
export const armyReducer = createReducer(
  initialState,
  on(loadAllUnitsSuccess, loadAllUnitsSuccessHandler),
  on(loadAllAbilities, loadAllAbilitiesHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler),
);

