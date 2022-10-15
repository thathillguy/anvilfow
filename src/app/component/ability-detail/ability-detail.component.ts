import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ability } from '../../../types/Ability';
import { enableAbilityToSelectedUnit } from '../../store/app.actions';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.less']
})
export class AbilityDetailComponent {

  abilityIsActive: boolean = false;
  _ability: Ability | null = null;
  @Input() set ability(value: Ability) {
    this._ability = value;
    if(value.isActive) {
      this.abilityIsActive = value.isActive;
    }
    console.log(`in setAbility: abilityIsActive for ${this._ability.name} is ${this.abilityIsActive}`);
  }

  constructor(private store: Store) {
  }

  abilityToggle(e: any) {
    if(this._ability) {
      this.abilityIsActive = !this.abilityIsActive;
      console.log(`beep 1: ${this._ability.name} ${this.abilityIsActive}`);
      if(this._ability) {
        this.store.dispatch(enableAbilityToSelectedUnit({targetAbility: this._ability, newStatus: this.abilityIsActive}));
        console.log(`1: ${this._ability.name} is now ${this._ability.isActive} after dispatch`);
      }
    }
  }

}
