import {createAction, props} from '@ngrx/store';
import {Ability} from "../../types/Ability";
import {UnitData} from "../../types/UnitData";

export const LOAD_CORE_RULES = '[All] Load Core Rules';
export const LOAD_CORE_RULES_SUCCESS = '[All] Load Core Rules Success';
export const LOAD_CORE_RULES_FAILURE = '[All] Load Core Rules Failures';

export const loadCoreRules = createAction(LOAD_CORE_RULES);
export const loadCoreRulesSuccess = createAction(LOAD_CORE_RULES_SUCCESS,  props<{ coreRules: Ability[]}>());
export const loadCoreRulesFailure = createAction(LOAD_CORE_RULES_FAILURE);

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

export const addUnitToArmy = createAction(
  '[Army Component] Add To Army',
  props<{unitToAdd: UnitData, selectedLoadout: string}>()
);

export const removeUnitFromArmy = createAction(
  '[Army Component] Remove From Army',
  props<{unitToRemoveID: number}>()
);

export const selectArmyUnit = createAction(
  '[Army Component] Select Army Unit',
  props<{selectedArmyUnitID: number}>()
);

export const enableAbilityToSelectedUnit = createAction(
  '[Army Component] Enable Action To Selected Component',
  props<{targetAbility: Ability, newStatus: boolean}>()
);
