export interface EffectData {
    effectType: string; //STATMOD, REROLL, TRIGGER
    stat: string;
    modValue?: number;
    onlyReroll1s?: boolean;
    triggerRoleValue?: string;
    effectText: string;
}