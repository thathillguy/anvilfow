import { createSelector } from '@ngrx/store';
import { AppState, ArmyState } from './app.reducer';
 
export const selectArmy = (state: AppState) => state.army;
 
export const selectActiveUnit = createSelector(
    selectArmy,
  (state: ArmyState) => state.selectedUnit
);

export const selectAllUnits = createSelector(
  selectArmy,
  (state: ArmyState) => state.allUnits
);

export const selectAllAbilites = createSelector(
  selectArmy,
  (state: ArmyState) => state.allAbilities
);

