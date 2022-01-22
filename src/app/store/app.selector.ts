import { createSelector } from '@ngrx/store';
import {ArmyState} from "./app.reducer";

export interface AppState {
  army: ArmyState
}
export const selectArmy = (state: AppState) => state.army;

export const selectAllUnits = createSelector(
  selectArmy,
  (state: ArmyState) => state.allUnits
);

export const selectAllAbilites = createSelector(
  selectArmy,
  (state: ArmyState) => state.allAbilities
);
