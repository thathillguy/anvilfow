import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y/input-modality/input-modality-detector";
import { EffectData } from "./EffectData";

export class Effect {
    effectType: string; //STATMOD, REROLL, TRIGGER
    stat: string;
    modValue?: number;
    onlyReroll1s?: boolean;
    triggerRoleValue?: string;
    effectText: string;

    constructor(initialData: EffectData) {
        if(initialData.effectType === "TRIGGER") {
            this.effectType = initialData.effectType;
            this.stat = initialData.stat;
            this.triggerRoleValue = initialData.triggerRoleValue;
            this.effectText = initialData.effectText;

        } else if (initialData.effectType === "REROLL") {
            this.effectType = initialData.effectType;
            this.stat = initialData.stat;
            this.onlyReroll1s = initialData.onlyReroll1s;
            this.effectText = initialData.effectText;

        } else if (initialData.effectType === "STATMOD") {
            this.effectType = initialData.effectType;
            this.stat = initialData.stat;
            this.modValue = initialData.modValue;
            this.effectText = initialData.effectText;
        } else {
            this.effectType = "ERROR";
            this.stat = "na"
            this.effectText = "something went wrong";

        }
    }
}