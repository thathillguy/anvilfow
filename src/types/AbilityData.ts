import { EffectData } from "./EffectData";

export interface AbilityData {
    abilityName: string;
    abilitySource: string;
    abilityShortText: string;
    abilityFullText: string;
    phase: string[];
    sourceUnit?: string;
    showOn: string[];
    effects: EffectData[];
}