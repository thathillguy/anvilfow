import { ReadKeyExpr } from '@angular/compiler';
import { of } from 'rxjs';
import { UnitData } from '../types/unitData';
import { Ability } from './Ability';
import { Effect } from './Effect';
import { Weapon } from './Weapon';

export class Unit {
    unitName: string;
    keywords: string[];

    baseMove: number;
    move: number;
    moveEffects: Effect[];

    baseSave: number;
    save: number;
    saveEffects: Effect[];

    baseBravery: number;
    bravery: number;
    braveryEffects: Effect[];

    baseWounds: number;
    wounds: number;
    woundsEffects: Effect[];
    woundsTaken: number = 0;

    missileWeapons: Weapon[];
    meleeWeapons: Weapon[];
    abilities: Ability[];

    constructor(initialData: UnitData) {
        this.unitName = initialData.unitName;
        this.keywords = initialData.keywords;

        this.baseMove = initialData.baseMove;
        this.move = this.baseMove;

        this.baseSave = initialData.baseSave;
        this.save = this.baseSave;

        this.baseBravery = initialData.baseBravery;
        this.bravery = this.baseBravery;

        this.baseWounds = initialData.baseWounds;
        this.wounds = this.baseWounds;

        this.missileWeapons = new Array<Weapon>();
        for(let i = 0; i < initialData.missileWeapons.length; i++) {
            this.missileWeapons.push(new Weapon(initialData.missileWeapons[i]));
        }

        this.meleeWeapons = new Array<Weapon>();
        for(let i = 0; i < initialData.meleeWeapons.length; i++) {
            this.meleeWeapons.push(new Weapon(initialData.meleeWeapons[i]));
        }

        this.moveEffects = new Array<Effect>();
        this.saveEffects = new Array<Effect>();
        this.braveryEffects = new Array<Effect>();
        this.woundsEffects = new Array<Effect>();

        this.abilities = new Array<Ability>();
        for (const element of initialData.abilities) {
            let newAbility: Ability = new Ability(element);
            //apply all effects that this unit grants to itself
            this.addAbility(newAbility);
        }
    }

    //Adds a given ability to this unit. Can be either this unit's own abilities, or external abilities.
    addAbility(newAbility: Ability) {
        this.abilities.push(newAbility);
        if(newAbility.isActive) {
            for (const element of newAbility.effects) {
                this.addOrRemoveEffect(element, true);
            }
        }
    }

    //Enable or disable abilities
    setAbilityStatus(targetAbility: Ability, newStatus: boolean) {
        //first, find the ability in question
        for (const element of this.abilities) {
            if(element.abilityName === targetAbility.abilityName) {
                if(!element.isActive && newStatus) {
                    //activate the ability and its effects
                    element.isActive = true;
                    for (const effectElement of element.effects) {
                        this.addOrRemoveEffect(effectElement, true);
                    }
                } else if (!newStatus && element.isActive) {
                    //Disable the ability and remove its effects
                    element.isActive = false;
                    for (const effectElement of element.effects) {
                        this.addOrRemoveEffect(effectElement, false);
                    }
                }
            }
        }
    }

    //Take an Effect and apply it: add it to the appropriate list, and modify any relevant values
    //This assumes that the effect should actually be applied! (i.e. conditional effects are checked before calling)
    // If parameter add is true, we add. Else, we remove.
    addOrRemoveEffect(newEffect: Effect, add: boolean) {
        //Get the stat being affected. If it's a unit-based stat, just use it.
        //Ex: move, save, bravery, wounds, run, charge 
        //If it's a weapon-based stat, it'll have a colon and it will designate what type of weapon it affects
        //Ex: [attacks, toHit, toWound, rend, damage]:[All, Melee, Missile, WeaponName]

        const colonSpot = newEffect.stat.indexOf(":");
        let targetStat: string;
        let applyTo: string;
        if(colonSpot > 0 ) {
            targetStat = newEffect.stat.substring(0, colonSpot);
            applyTo = newEffect.stat.substring(colonSpot+1, newEffect.stat.length);
        } else {
            targetStat = newEffect.stat;
            applyTo = "";
        }

        switch (targetStat) {
            case "move":
            case "run":
            case "charge":
                if(add) {
                    this.addEffectToArray(newEffect, this.moveEffects);
                    if(targetStat === "move" && newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.move += newEffect.modValue as number;
                    }
                } else {
                    this.removeEffectFromArray(newEffect, this.moveEffects);
                    if(targetStat === "move" && newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.move -= newEffect.modValue as number;
                    }
                }
                break;
            
            case "save":
                if(add) {
                    this.addEffectToArray(newEffect, this.saveEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to save actually takes a 4+ save to a 3+ save (also, cap at +/- 1 from base)
                        this.save -= newEffect.modValue as number;
                        this.save = Math.max(this.save, this.baseSave - 1);
                        this.save = Math.min(this.save, this.baseSave + 1);
                    }
                } else {
                    this.removeEffectFromArray(newEffect, this.saveEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.save += newEffect.modValue as number;
                        this.save = Math.max(this.save, this.baseSave - 1);
                        this.save = Math.min(this.save, this.baseSave + 1);
                    }
                }
                break;

            case "bravery":
                if(add) {
                    this.addEffectToArray(newEffect, this.braveryEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.bravery += newEffect.modValue as number;
                    }
                } else {
                    this.removeEffectFromArray(newEffect, this.braveryEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.bravery -= newEffect.modValue as number;
                    }
                }
                break;

            case "wounds":
                if(add) {
                    this.addEffectToArray(newEffect, this.woundsEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.wounds += newEffect.modValue as number;
                    }
                } else {
                    this.removeEffectFromArray(newEffect, this.woundsEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        this.wounds -= newEffect.modValue as number;
                    }
                }
                break;

            case "attacks":
            case "toHit":
            case "toWound":
            case "rend":
            case "damage":
                if(add) {
                    this.addOrRemoveWeaponEffects(newEffect, targetStat, applyTo, true);
                } else {
                    this.addOrRemoveWeaponEffects(newEffect, targetStat, applyTo, false);
                }
                break;
        }
    }

    //Called from addOrRemoveEffect when we want to modify a weapon stat. Looks through weapons for the appropriate ones and adds the effect
    addOrRemoveWeaponEffects(newEffect: Effect, targetStat: string, applyTo: string, add: boolean) {
        for(let i = 0; i < this.meleeWeapons.length; i++) {
            if(applyTo === "All" || applyTo === "Melee" || applyTo === this.meleeWeapons[i].weaponName) {
                if(add) {
                    this.addOrRemoveWeaponEffect(newEffect, targetStat, this.meleeWeapons[i], true);
                } else {
                    this.addOrRemoveWeaponEffect(newEffect, targetStat, this.meleeWeapons[i], false);
                }
            }
        }
        for(let i = 0; i < this.missileWeapons.length; i++) {
            if(applyTo === "All" || applyTo === "Melee" || applyTo === this.missileWeapons[i].weaponName) {
                if(add) {
                    this.addOrRemoveWeaponEffect(newEffect, targetStat, this.missileWeapons[i], true);
                } else {
                    this.addOrRemoveWeaponEffect(newEffect, targetStat, this.missileWeapons[i], false);
                }
            }
        }
    }

    //Called from addOrRemoveWeaponEffects when we found the right weapon to apply the effect to
    addOrRemoveWeaponEffect(newEffect: Effect, targetStat: string, weapon: Weapon, add: boolean) {
        switch (targetStat) {
            case "attacks":
                if(add) {
                    this.addEffectToArray(newEffect, weapon.attacksEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        weapon.attacks += newEffect.modValue as number;
                    }
                } else {
                    this.removeEffectFromArray(newEffect, weapon.attacksEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        weapon.attacks -= newEffect.modValue as number;
                    }
                }
                break;

            case "toHit":
                if(add) {
                    this.addEffectToArray(newEffect, weapon.hitEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to hit actually takes a 4+ to hit to a 3+ to hit (also, cap at +/- 1 from base)
                        weapon.toHit -= newEffect.modValue as number;
                        weapon.toHit = Math.max(weapon.toHit, weapon.baseToHit - 1);
                        weapon.toHit = Math.min(weapon.toHit, weapon.baseToHit + 1);
                    }
                } else {
                    this.removeEffectFromArray(newEffect, weapon.hitEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to hit actually takes a 4+ to hit to a 3+ to hit (also, cap at +/- 1 from base)
                        weapon.toHit += newEffect.modValue as number;
                        weapon.toHit = Math.max(weapon.toHit, weapon.baseToHit - 1);
                        weapon.toHit = Math.min(weapon.toHit, weapon.baseToHit + 1);
                    }
                }
                break;

            case "toWound":
                if(add) {
                    this.addEffectToArray(newEffect, weapon.woundEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to wound actually takes a 4+ to a 3+ (also, cap at +/- 1 from base)
                        weapon.toWound -= newEffect.modValue as number;
                        weapon.toWound = Math.max(weapon.toWound, weapon.baseToWound - 1);
                        weapon.toWound = Math.min(weapon.toWound, weapon.baseToWound + 1);
                    }
                } else {
                    this.removeEffectFromArray(newEffect, weapon.woundEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to wound actually takes a 4+ to a 3+ (also, cap at +/- 1 from base)
                        weapon.toWound += newEffect.modValue as number;
                        weapon.toWound = Math.max(weapon.toWound, weapon.baseToWound - 1);
                        weapon.toWound = Math.min(weapon.toWound, weapon.baseToWound + 1);
                    }
                }
                break;

            case "rend":
                if(add) {
                    this.addEffectToArray(newEffect, weapon.rendEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        weapon.rend += newEffect.modValue as number;
                    }
                } else {
                    this.removeEffectFromArray(newEffect, weapon.rendEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        weapon.rend -= newEffect.modValue as number;
                    }
                }
                break;

            case "damage":
                if(add) {
                    this.addEffectToArray(newEffect, weapon.damageEffects);
                } else {
                    this.removeEffectFromArray(newEffect, weapon.damageEffects);
                }
                //Since this is a string (to support D3 damage weapons) just remake the string taking into account all current effects
                weapon.damage = weapon.baseDamage;
                for (const element of weapon.damageEffects) {
                    if(element.effectType === "STATMOD" && element.modValue) {
                        weapon.damage += element.modValue.toString();
                    }
                }
                break;
        }
    }

    addEffectToArray(element: Effect, array: Effect[]) {
        array.push(element);
    }

    removeEffectFromArray(element: Effect, array: Effect[]) {
        array.forEach((value,index)=>{
            if(value==element) array.splice(index,1);
        });
    }

    toString(): string {
        return `Hello, my name is ${this.unitName} and I have taken ${this.woundsTaken} wounds out of ${this.wounds}. I have ${this.missileWeapons.length} missile weapons and ${this.meleeWeapons.length} melee weapons`;
    }

    warscroll(): string {
        let returnString: string = `~~${this.unitName}~~
Wounds: ${this.wounds}${this.modifiedMark("wounds")} (${this.woundsTaken} taken)
Move: ${this.move}\"${this.modifiedMark("move")}
Save: ${this.save}+${this.modifiedMark("save")}
Bravery: ${this.bravery}${this.modifiedMark("bravery")}
`;
        
        if(this.missileWeapons.length > 0){
            returnString = returnString.concat(`MISSILE WEAPONS           Range|Attacks|To Hit|To Wound|Rend|Damage
`);
            for(let i = 0; i < this.missileWeapons.length; i++) {
                returnString = returnString.concat(`${this.missileWeapons[i].toString()}
`);
            }
        }
        if(this.meleeWeapons.length > 0){
            returnString = returnString.concat(`MELEE WEAPONS             Range|Attacks|To Hit|To Wound|Rend|Damage
`);
            for(let i = 0; i < this.meleeWeapons.length; i++) {
                returnString = returnString.concat(`${this.meleeWeapons[i].toString()}
`);
            }
        }
        if(this.abilities.length > 0) {
            returnString = returnString.concat(`Abilities:
`);
            for(let i = 0; i < this.abilities.length; i++) {
                returnString = returnString.concat(`${this.abilities[i].abilityName}: ${this.abilities[i].abilityFullText}
`);
            }
        }

        return returnString;
    }

    modifiedMark(stat: string): string {
        switch (stat) {
            case "move":
                if(this.moveEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "save":
                if(this.saveEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "bravery":
                if(this.braveryEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }

            case "wounds":
                if(this.woundsEffects.length > 0) {
                    return "*";
                } else {
                    return " ";
                }
        }
        return " ";
    }

}