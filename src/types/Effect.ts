export interface Effect {
    effectType: string; //STATMOD, REROLL, TRIGGER
    stat: string;
    modValue?: number;
    onlyReroll1s?: boolean;
    triggerRollValue?: string;
    effectText: string;
}