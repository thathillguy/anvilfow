import { Component, OnInit, Input } from '@angular/core';
import { Effect } from '../../../types/Effect';
import { Unit } from '../../../types/Unit';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.less']
})

export class UnitDetailComponent implements OnInit {

  @Input() unit?: Unit;
  selectedStatBase? : (string | number);
  selectedStatCurrent? : (string | number);
  selectedStatEffects?: Effect[];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(statBase:(string | number) , statCurrent:(string | number), selectedStatEffects:Effect[]) {
    this.selectedStatBase = statBase;
    this.selectedStatCurrent = statCurrent;
    this.selectedStatEffects = selectedStatEffects;
  }

}
