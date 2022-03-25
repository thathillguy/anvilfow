import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnitData } from '../../../types/UnitData';
import { addUnitToArmy } from '../../store/app.actions';

@Component({
  selector: 'app-unit-library',
  templateUrl: './unit-library.component.html',
  styleUrls: ['./unit-library.component.less']
})
export class UnitLibraryComponent implements OnInit {

  @Input() units: UnitData[] | null = [];
  selectedUnit: UnitData | null = null;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
  }

  onSelect(unit: UnitData) {
    this.selectedUnit = unit;
  }

}
