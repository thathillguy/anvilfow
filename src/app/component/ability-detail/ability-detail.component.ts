import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ability } from '../../../types/Ability';
import { enableAbilityToSelectedUnit } from '../../store/app.actions';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.less']
})
export class AbilityDetailComponent implements OnInit {

  @Input() ability?: Ability;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  abilityToggle() {
    if(this.ability) {
      //this.ability.isActive = !this.ability.isActive;
      this.store.dispatch(enableAbilityToSelectedUnit({targetAbility: this.ability, newStatus: true}));
      console.log(`1: ${this.ability.abilityName} is now ${this.ability.isActive} after dispatch`);
    }
  }

}
