import { createSelector } from '@ngrx/store';
import { AppState, ArmyState } from './app.reducer';
 
export const selectArmy = (state: AppState) => state.army;
 
export const selectCoreRules = createSelector(
  selectArmy,
  (state: ArmyState) => state.coreRules
);

export const selectArmyUnits = createSelector(
  selectArmy,
(state: ArmyState) => state.armyUnits
);

export const selectActiveUnitID = createSelector(
    selectArmy,
  (state: ArmyState) => state.activeUnitID
);

export const selectAllUnits = createSelector(
  selectArmy,
  (state: ArmyState) => state.allUnits
);

export const selectAllAbilities = createSelector(
  selectArmy,
  (state: ArmyState) => state.allAbilities
);

