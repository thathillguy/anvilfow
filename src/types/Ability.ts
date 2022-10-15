import { Effect } from "./Effect";

export interface Ability {
    name: string;
    abilityType?: string;       //conditional in data
    spell?: boolean;                //conditional in data
    targetRestrictions?: string[];  //conditional in data
    source: string;
    shortText: string;
    fullText?: string;
    phase: string[];
    sourceUnit?: string;
    showOn?: string[];
    conditionText?: string;        //conditional in data
    isActive?: boolean;            //not in data
    effects?: Effect[];
}