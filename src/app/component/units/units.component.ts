import { Component, OnInit } from '@angular/core';
import { Unit } from '../../../types/Unit';
import { UnitData } from '../../../types/UnitData';
import { AppComponent } from '../../app.component';
import s2dUnitData from '../../../../e2e/S2DUnits.json';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.less']
})
export class UnitsComponent implements OnInit {

  units: Unit[] = new Array<Unit>();
  selectedUnit?: Unit;

  constructor() {

    const myS2DUnitData: UnitData[] = AppComponent.readUnitJSON(s2dUnitData);
    this.units.push(new Unit(myS2DUnitData[0]));
    this.units.push(new Unit(myS2DUnitData[1]));

  }

  ngOnInit(): void {

  }

  onSelect(unit: Unit) {
    this.selectedUnit = unit;
  }

}
