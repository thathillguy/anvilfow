import {createAction, props} from '@ngrx/store';
import {Ability} from "../../types/Ability";
import {Unit} from "../../types/Unit";
import {UnitData} from "../../types/UnitData";

export const LOAD_ALL_UNITS = '[All] Load Army';
export const LOAD_ALL_UNITS_SUCCESS = '[All] Load Army Success';
export const LOAD_ALL_UNITS_FAILURE = '[All] Load Army Failures';
export const loadAllUnits = createAction(LOAD_ALL_UNITS);
export const loadAllUnitsSuccess = createAction(LOAD_ALL_UNITS_SUCCESS,  props<{ units: UnitData[]}>());
export const loadAllUnitsFailure = createAction(LOAD_ALL_UNITS_FAILURE);

export const LOAD_ALL_ABILITIES = '[All] Load Abilities';
export const LOAD_ALL_ABILITIES_SUCCESS = '[All] Load Abilities Success';
export const LOAD_ALL_ABILITIES_FAILURE = '[All] Load Abilities Failures';
export const loadAllAbilities = createAction(LOAD_ALL_ABILITIES);
export const loadAllAbilitiesSuccess = createAction(LOAD_ALL_ABILITIES_SUCCESS,  props<{ units: Ability[]}>());
export const loadAllAbilitiesFailure = createAction(LOAD_ALL_ABILITIES_FAILURE);

export const addUnitToArmy = createAction('[Army Component] Add To Army');

export const selectUnit = createAction(
  '[Army Component] Select Unit',
  props<{selectedUnit: Unit}>()
);

export const enableAbilityToSelectedUnit = createAction(
  '[Army Component] Enable Action To Selected Component',
  props<{targetAbility: Ability, newStatus: boolean}>()
);
