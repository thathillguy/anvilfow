import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {UnitService} from "../service/json.service";
import {
  LOAD_ALL_ABILITIES_FAILURE,
  LOAD_ALL_ABILITIES_SUCCESS,
  LOAD_ALL_UNITS_FAILURE,
  LOAD_ALL_UNITS_SUCCESS, loadAllAbilities,

  loadAllAbilitiesFailure, loadAllAbilitiesSuccess,
  loadAllUnits,
  loadAllUnitsFailure,
  loadAllUnitsSuccess
} from "../store/app.actions";

@Injectable()
export class UnitsEffects {

  loadAllUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllUnits),
      mergeMap(() => this.unitService.readUnitJSON()
        .pipe(
          map(units => {console.log(units); return ({ type: LOAD_ALL_UNITS_SUCCESS, units: units })}),
          catchError(() => of({type: LOAD_ALL_UNITS_FAILURE}))
        )
      )
    )
  );

  loadAllAbilities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllAbilities),
      mergeMap(() => this.unitService.readAbilityJSON()
        .pipe(
          map(units => {console.log(units); return ({ type: LOAD_ALL_ABILITIES_SUCCESS, abilities: units })}),
          catchError(() => of({type: LOAD_ALL_ABILITIES_FAILURE}))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private unitService: UnitService
  ) {}
}
