import { Component, Input, OnInit } from '@angular/core';
import { Ability } from '../../../../types/Ability';

@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.less']
})
export class RuleDetailComponent implements OnInit {

  @Input() rule: Ability | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
