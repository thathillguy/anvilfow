import { Component, Input, OnInit } from '@angular/core';
import { Ability } from '../../../../types/Ability';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.less']
})
export class RemindersComponent implements OnInit {

  allPhases: string[] = [ "ROUNDSTART",
                          "HERO",
                          "MOVE",
                          "SHOOT",
                          "CHARGE",
                          "COMBAT",
                          "BSHOCK"];
  allPhasesDisplay: string[] = [ "Round Start",
                          "Hero Phase",
                          "Movement Phase",
                          "Shooting Phase",
                          "Charge Phase",
                          "Combat Phase",
                          "Battleshock Phase"];
  currentPhase: number = 0;
  @Input() allRules: Ability[] | null = [];
  currentPhaseRules: Ability[] = [];
  heroicActions: Ability[] = [];
  monstrousRampages: Ability[] = [];

  abilitiesPhaseStart: Ability[] = [];
  abilitiesPhaseMiddle: Ability[] = [];
  abilitiesPhaseEnd: Ability[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.updateRules();
  }

  prevPhase() {
    this.currentPhase--;
    if(this.currentPhase < 0) {
      this.currentPhase = this.allPhases.length - 1;
    }
    this.updateRules();
  }

  nextPhase() {
    this.currentPhase++;
    if(this.currentPhase > this.allPhases.length-1) {
      this.currentPhase = 0;
    }
    this.updateRules();
  }

  //Go through the list of all rules, and get those that apply to this phase
  updateRules() {
    this.currentPhaseRules = [];
    this.heroicActions = [];
    this.abilitiesPhaseStart = [];
    this.abilitiesPhaseMiddle = [];
    this.abilitiesPhaseEnd = [];
    this.monstrousRampages = [];

    for(let rule of this.allRules!) {
      //Load all the actual rules
      if((rule.abilityType && rule.abilityType =="RULE")
          || !rule.abilityType) {
        for(let phase of rule.phase) {
          if(phase.match(this.allPhases[this.currentPhase])) {
            this.currentPhaseRules.push(rule);
          }
        }
      //load the Heroic Actions
      } else if (rule.abilityType && rule.abilityType ==="HA") {
        this.heroicActions.push(rule);
      //load the Monstrous Rampages
      } else if (rule.abilityType && rule.abilityType ==="MR") {
        this.monstrousRampages.push(rule);
      } else {
        //load all other abilities to the appropriate array if they apply in this phase
        for(let phase of rule.phase) {
          if (this.allPhases[this.currentPhase] == "HERO") {
            if(phase == "HEROSTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INHERO") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "HEROEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          } else if (this.allPhases[this.currentPhase] == "MOVE") {
            if(phase == "MOVESTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INMOVE") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "MOVEEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          } else if (this.allPhases[this.currentPhase] == "SHOOT") {
            if(phase == "SHOOTSTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INSHOOT") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "SHOOTEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          } else if (this.allPhases[this.currentPhase] == "CHARGE") {
            if(phase == "CHARGESTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INCHARGE") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "CHARGEEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          } else if (this.allPhases[this.currentPhase] == "COMBAT") {
            if(phase == "COMBATSTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INCOMBAT") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "COMBATEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          } else if (this.allPhases[this.currentPhase] == "BSHOCK") {
            if(phase == "BSHOCKSTART") {
              this.abilitiesPhaseStart.push(rule);
            } else if (phase == "INBSHOCK") {
              this.abilitiesPhaseMiddle.push(rule);
            } else if (phase == "BSHOCKEND") {
              this.abilitiesPhaseEnd.push(rule);
            }
          }
        }
      }
    }
  }
}
