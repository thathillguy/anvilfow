import { AbilityData } from "./AbilityData";
import { Effect } from "./Effect";
import { Unit } from "./Unit";

export class Ability {
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

    constructor(initialData: AbilityData) {
        this.abilityName = initialData.abilityName;
        if(initialData.commandAbility){
            this.commandAbility = true;
            this.targetRestrictions = <string[]>initialData.targetRestrictions;
        } else {
            this.commandAbility = false;
            this.targetRestrictions = [];
        }
        this.abilitySource = initialData.abilitySource;
        this.abilityShortText = initialData.abilityShortText;
        this.abilityFullText = initialData.abilityFullText;
        this.phase = initialData.phase;
        this.sourceUnit = initialData.sourceUnit;
        this.showOn = initialData.showOn;

        if(initialData.conditionText) {
            this.conditionText = initialData.conditionText;
            this.isActive = false;
        } else if (this.commandAbility) {
            this.conditionText = "";
            this.isActive = false;
        } else {
            this.conditionText = "";
            this.isActive = true;
        }

        this.effects = new Array<Effect>();
        console.log(`Ability Constructor: effects ${initialData.effects}`);
        if(initialData.effects) {
            console.log(`Ability Constructor: effects ${initialData.effects.length}`);
            for(let i = 0; i < initialData.effects.length; i++){
                this.effects.push(new Effect(initialData.effects[i]));
            }
        }
    }

    static createAbilityListFromData(initialData: AbilityData[]): Ability[] {
        let abilityList = new Array<Ability>();
        for(let i = 0; i < initialData.length; i++) {
            abilityList.push(new Ability(initialData[i]));
        }
        return abilityList;
    }

    static findAbilityByName(name: string, abilityList: Ability[]): Ability | null {
        let foundAbility: Ability | null = null;

        for (const element of abilityList) {
            if(name === element.abilityName) {
                foundAbility = element;
                break;
            }
        }
        return foundAbility;
    }

    static findAbiliesInPhase(phase: string, abilityList: Ability[], unitList?: Unit[]): Ability[] {
        let foundAbilities: Ability[] = new Array<Ability>();

        for (const ability of abilityList) {
            if(ability.showOn.includes("OVERVIEW") && ability.phase.includes(phase)) {
                foundAbilities.push(ability);
            }
        }
        if(typeof unitList !== 'undefined'){
            for (const unit of unitList) {
                for(const ability of unit.abilities){
                    if(ability.showOn.includes("OVERVIEW") && ability.phase.includes(phase)) {
                        foundAbilities.push(ability);
                    }
                }
            }
        }
        return foundAbilities;
    }

    toString(): string {
        return `${this.abilityName}: ${this.abilityFullText}`;
    }
}