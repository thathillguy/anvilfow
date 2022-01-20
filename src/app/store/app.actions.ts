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
export const LOAD_ALL_ABILITIES_SUCCESS = '[All] Load Army Success';
export const LOAD_ALL_ABILITIES_FAILURE = '[All] Load Army  Failures';
export const loadAllAbilities = createAction(LOAD_ALL_ABILITIES);
export const loadAllAbilitiesSuccess = createAction(LOAD_ALL_ABILITIES_SUCCESS);
export const loadAllAbilitiesFailure = createAction(LOAD_ALL_ABILITIES_FAILURE);

export const selectUnit = createAction('Select Unit', props<{ unit: Unit}>());
export const enableAbilityToSelectedUnit = createAction(
  '[Army Component] Enable Action To Selected Component',
  props<{targetAbility: Ability, newStatus: boolean}>()
);
