export interface EffectData {
    effectType: string; //STATMOD, REROLL, TRIGGER
    stat?: string;
    modValue?: number;
    onlyReroll1s?: boolean;
    triggerRoleType?: string;
    triggerRoleValue?: string;
    conditionText?: string;
    effectText: string;
}