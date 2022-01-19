import { createReducer, on } from '@ngrx/store';

const initialState = {
  allUnits: [],
  armyUnits: [],
  displayedUnit: null,
  modalData: null,
}
const _armyReducer = createReducer(
  initialState,
);

export function armyReducer(state, action) {
  return _armyReducer(state, action);
}
