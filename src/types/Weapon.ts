import { Effect } from "./Effect";
import { WeaponData } from "./WeaponData";

export class Weapon {
    weaponName: string;
    isMount: boolean = false;
    range: string;

    baseAttacks: number;
    attacks: number;
    attacksEffects: Effect[];

    baseToHit: number;
    toHit: number;
    hitEffects: Effect[]

    baseToWound: number;
    toWound: number;
    woundEffects: Effect[];

    baseRend: number;
    rend: number;
    rendEffects: Effect[];

    baseDamage: string;
    damage: string;
    damageEffects: Effect[];

    constructor(initialData: WeaponData) {
        this.weaponName = initialData.weaponName;
        if(initialData.isMount) {
            this.isMount = true;
        }
        this.range = initialData.range;

        this.baseAttacks = initialData.baseAttacks;
        this.attacks = this.baseAttacks;

        this.baseToHit = initialData.baseToHit;
        this.toHit = this.baseToHit;

        this.baseToWound = initialData.baseToWound;
        this.toWound = this.baseToWound;

        this.baseRend = initialData.baseRend;
        this.rend = this.baseRend;

        this.baseDamage = initialData.baseDamage;
        this.damage = this.baseDamage;

        this.attacksEffects = new Array<Effect>();
        this.hitEffects = new Array<Effect>();
        this.woundEffects = new Array<Effect>();
        this.rendEffects = new Array<Effect>();
        this.damageEffects = new Array<Effect>();
    }

    toString(): string {
        let weaponNamePad = this.weaponName.padStart(25);
        let rangePad = this.range.padStart(3);
        let rendPad: string = this.rend.toString().padStart(2);
        return `${weaponNamePad}  ${rangePad}    ${this.attacks}${this.modifiedMark("attacks")}     ${this.toHit}+${this.modifiedMark("hit")}      ${this.toWound}+${this.modifiedMark("wound")}    ${rendPad}${this.modifiedMark("rend")}   ${this.damage}${this.modifiedMark("damage")}`;
    }

    modifiedMark(stat: string): string {
        switch (stat) {
            case "attacks":
                if(this.attacksEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "hit":
                if(this.hitEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "wound":
                if(this.woundEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "rend":
                if(this.rendEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }
            case "damage":
                if(this.damageEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }
        }
        return " ";
    }

}