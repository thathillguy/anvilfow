import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../../../types/Unit';
import { UnitData } from '../../../types/UnitData';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.less']
})

export class UnitsComponent implements OnInit {

  @Input() units: UnitData[] | null = [];
  selectedUnit?: Unit;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.units)
  }

  onSelect(unit: Unit | UnitData) {
    let selected: Unit;
    if( unit instanceof Unit) {
      selected = <Unit>unit;
    } else {
      selected = new Unit(<Unit>unit)
    }
    this.selectedUnit = selected;
  }

}
