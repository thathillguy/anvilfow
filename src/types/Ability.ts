import { Effect } from "./Effect";

export interface Ability {
    abilityName: string;
    commandAbility: boolean;
    targetRestrictions: string[];
    abilitySource: string;
    abilityShortText: string;
    abilityFullText: string;
    phase: string[];
    sourceUnit?: string;
    showOn: string[];
    conditionText: string;
    isActive: boolean;
    effects: Effect[];
}