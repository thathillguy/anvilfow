import { Effect } from "./Effect";

export interface Ability {
    abilityName: string;
    commandAbility: boolean;       //conditional in data
    spell: boolean;                //conditional in data
    targetRestrictions: string[];  //conditional in data
    abilitySource: string;
    abilityShortText: string;
    abilityFullText: string;
    phase: string[];
    sourceUnit?: string;
    showOn: string[];
    conditionText: string;        //conditional in data
    isActive: boolean;            //not in data
    effects: Effect[];
}