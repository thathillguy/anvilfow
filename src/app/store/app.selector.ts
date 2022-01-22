import { createSelector } from '@ngrx/store';
import { AppState, ArmyState } from './app.reducer';
 
export const selectArmy = (state: AppState) => state.army;
 
export const selectActiveUnit = createSelector(
    selectArmy,
  (state: ArmyState) => state.selectedUnit
);