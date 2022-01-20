import { Component, Input, OnInit } from '@angular/core';
import { Ability } from '../../../types/Ability';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.less']
})
export class AbilityDetailComponent implements OnInit {

  @Input() ability?: Ability;

  constructor() { }

  ngOnInit(): void {
  }

}
