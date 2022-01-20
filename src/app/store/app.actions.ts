import {createAction, props} from '@ngrx/store';
import {Ability} from "../../types/Ability";

export const loadAllUnits = createAction('[Army Component] Load All');
export const addUnitToArmy = createAction('[Army Component] Add To Army');
export const enableAbilityToSelectedUnit = createAction(
  '[Army Component] Enable Action To Selected Component',
  props<{targetAbility: Ability, newStatus: boolean}>()
);
