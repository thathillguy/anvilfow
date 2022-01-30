import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArrayValueHelper } from '../../../types/ArrayValueHelper';
import { Effect } from '../../../types/Effect';
import { Unit } from '../../../types/Unit';
import { Weapon } from '../../../types/Weapon';
import { ArmyState } from '../../store/app.reducer';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.less']
})

export class UnitDetailComponent implements OnInit {

  @Input() unit: Unit | null = null;
  //selectedUnit$: Observable<Unit | null>;
  
  selectedStatBase? : (string | number | string[] | number[]);
  selectedStatCurrent? : (string | number);
  selectedStatEffects?: Effect[];

  constructor(private store: Store<ArmyState>) {
    //this.unit = null;
    //this.selectedUnit$ = store.select('selectedUnit');
   }

  ngOnInit(): void {
  }

  ngOnChanges() : void {
    console.log(` ngOnChanges in unitDetail: ${this.unit}`)
  }

  onSelect(statBase:(string | number | string[] | number[]) , statCurrent:(string | number), selectedStatEffects:Effect[]) {
    this.selectedStatBase = statBase;
    this.selectedStatCurrent = statCurrent;
    this.selectedStatEffects = selectedStatEffects;
  }

  addWound() {
    console.log(` addWound`);
    this.changeWounds(1);
  }

  removeWound() {
    console.log(` removeWound`);
    this.changeWounds(-1);
  }

  changeWounds(mod: number) {
    if(this.unit) {
      let newWounds: number = this.unit.woundsTaken + mod;
      this.unit = {...this.unit, woundsTaken: newWounds};
      this.unit = ArrayValueHelper.updateArrayValues(this.unit);
    }
  }



}
