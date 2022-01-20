import {Action, createReducer, on,} from '@ngrx/store';
import {Unit} from "../../types/Unit";
import {enableAbilityToSelectedUnit, loadAllUnits} from "./app.actions";
import {UnitData} from "../../types/UnitData";
import {Ability} from "../../types/Ability";

interface ArmyState {
  allUnits: UnitData[],
  armyUnits: Unit[],
  selectedUnit: Unit | null,
  modalData: any
}

const initialState: ArmyState = {
  allUnits: [],
  armyUnits: [],
  selectedUnit: null,
  modalData: null,
}

const loadAllUnitsHandler = (state: ArmyState) => {
  return state
}
const enableAbilityToSelectedUnitHandler = (state: ArmyState, {targetAbility, newStatus} : {targetAbility: Ability, newStatus: boolean}) => {
  return state
}
const _armyReducer = createReducer(
  initialState,
  on(loadAllUnits, loadAllUnitsHandler),
  on(enableAbilityToSelectedUnit, enableAbilityToSelectedUnitHandler)
);


export function armyReducer(state: ArmyState, action: Action) {
  return _armyReducer(state, action);
}
