import { Effect } from "./Effect";

export interface AbilityData {
    abilityName: string;
    commandAbility?: boolean;
    targetRestrictions?: string[];
    abilitySource: string;
    abilityShortText: string;
    abilityFullText: string;
    phase: string[];
    sourceUnit?: string;
    showOn: string[];
    conditionText?: string;
    effects: Effect[];
}