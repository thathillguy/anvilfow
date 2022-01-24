import { Ability } from "./Ability";
import { AbilityData } from "./AbilityData";
import { Effect } from "./Effect";
import { ObjectFactory } from "./ObjectFactory";
import { Unit } from "./Unit";
import { Weapon } from "./Weapon";

export class AbilityHelper {

    static createAbilityListFromData(initialData: AbilityData[]): Ability[] {
        let abilityList = new Array<Ability>();
        for(let i = 0; i < initialData.length; i++) {
            abilityList.push(ObjectFactory.createAbilityFromData(initialData[i]));
        }
        return abilityList;
    }

    static findAbilityByName(name: string, abilityList: Ability[]): Ability | null {
        let foundAbility: Ability | null = null;

        console.log(`In findAbilityByName, there are ${abilityList.length} items`);
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

    //Adds a given ability to the given unit. Used for both the unit's own abilities, and external army abilities
    static addAbilityToUnit(newAbility: Ability, unit: Unit) : Unit {
        let newUnit: Unit = {...unit};
        newUnit.abilities.push(newAbility);
        if(newAbility.isActive) {
            for (const effect of newAbility.effects) {
                newUnit = AbilityHelper.addOrRemoveEffect(newUnit, effect, true);
            }
        }
        return newUnit;
    }
    
    //Enable or disable abilities
    static setAbilityStatus(unit: Unit, targetAbility: Ability, newStatus: boolean) : Unit {
        let newUnit: Unit = {...unit};
        //first, find the ability in question
        let newAbilities: Ability[] = [];
        for (let i = 0; i < unit.abilities.length; i++) {
            let ability = unit.abilities[i];
            let newAbility: Ability = {...ability};
            if(ability.abilityName === targetAbility.abilityName) {
                newAbility.isActive = newStatus;
                if(ability.isActive === newStatus) {
                    return unit;
                }
                for (const effect of ability.effects) {
                    newUnit = this.addOrRemoveEffect(newUnit, effect, newStatus);
                }
            }
            newAbilities.push(newAbility);
        }
        console.log(`setAbilityStatus 111 ${JSON.stringify(newUnit)}`);
        newUnit = {...newUnit, abilities: newAbilities};
        return newUnit;
    }
    
    //Take an Effect and apply it: add it to the appropriate stat's effect list, and modify any relevant values
    //This assumes that the effect should actually be applied! (i.e. conditional effects are checked before calling)
    // If parameter add is true, we add. Else, we remove.
    static addOrRemoveEffect(unit: Unit, newEffect: Effect, add: boolean) : Unit {
        console.log(`addOrRemoveEffect: ${newEffect.effectText}`);
        let newUnit: Unit = {...unit};
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
                    unit.moveEffects = AbilityHelper.addEffectToArray(newEffect, unit.moveEffects);
                    if(targetStat === "move" && newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.move += newEffect.modValue as number;
                    }
                } else {
                    unit.moveEffects = AbilityHelper.removeEffectFromArray(newEffect, unit.moveEffects);
                    if(targetStat === "move" && newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.move -= newEffect.modValue as number;
                    }
                }
                break;

            case "save":
                if(add) {
                    unit.saveEffects = AbilityHelper.addEffectToArray(newEffect, unit.saveEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to save actually takes a 4+ save to a 3+ save (also, cap at +/- 1 from base)
                        unit.save -= newEffect.modValue as number;
                        unit.save = Math.max(unit.save, unit.baseSave - 1);
                        unit.save = Math.min(unit.save, unit.baseSave + 1);
                    }
                } else {
                    unit.saveEffects = AbilityHelper.removeEffectFromArray(newEffect, unit.saveEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.save += newEffect.modValue as number;
                        unit.save = Math.max(unit.save, unit.baseSave - 1);
                        unit.save = Math.min(unit.save, unit.baseSave + 1);
                    }
                }
                break;

            case "bravery":
                if(add) {
                    unit.braveryEffects = AbilityHelper.addEffectToArray(newEffect, unit.braveryEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.bravery += newEffect.modValue as number;
                    }
                } else {
                    unit.braveryEffects = AbilityHelper.removeEffectFromArray(newEffect, unit.braveryEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.bravery -= newEffect.modValue as number;
                    }
                }
                break;

            case "wounds":
                if(add) {
                    newUnit.woundsEffects = AbilityHelper.addEffectToArray(newEffect, unit.woundsEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        newUnit.wounds += newEffect.modValue as number;
                    }
                } else {
                    unit.woundsEffects = AbilityHelper.removeEffectFromArray(newEffect, unit.woundsEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        unit.wounds -= newEffect.modValue as number;
                    }
                }
                break;

            case "attacks":
            case "toHit":
            case "toWound":
            case "rend":
            case "damage":
                if(add) {
                    newUnit = AbilityHelper.addOrRemoveWeaponEffects(unit, newEffect, targetStat, applyTo, true);
                } else {
                    newUnit = AbilityHelper.addOrRemoveWeaponEffects(unit, newEffect, targetStat, applyTo, false);
                }
                break;
        }

        console.log(`addOrRemoveEffect about to return: ${JSON.stringify(newUnit)}`);

        return newUnit;
    }

    //Called from addOrRemoveEffect when we want to modify a weapon stat. Looks through weapons for the appropriate ones and adds the effect
    static addOrRemoveWeaponEffects(unit: Unit, newEffect: Effect, targetStat: string, applyTo: string, add: boolean) : Unit {
        let newUnit: Unit = {...unit};
        let newMeleeWeapons: Weapon[] = [];
        let newMissileWeapons: Weapon[] = [];

        for(let i = 0; i < unit.meleeWeapons.length; i++) {
            let newWeapon : Weapon = {...unit.meleeWeapons[i]};
            if(applyTo === "All" || applyTo === "Melee" || applyTo === unit.meleeWeapons[i].weaponName) {
                if(add) {
                    newWeapon = AbilityHelper.addOrRemoveWeaponEffect(unit, newEffect, targetStat, unit.meleeWeapons[i], true);
                } else {
                    newWeapon = AbilityHelper.addOrRemoveWeaponEffect(unit, newEffect, targetStat, unit.meleeWeapons[i], false);
                }
            }
            newMeleeWeapons.push(newWeapon);
        }
        for(let i = 0; i < unit.missileWeapons.length; i++) {
            let newWeapon : Weapon = {...unit.missileWeapons[i]};
            if(applyTo === "All" || applyTo === "Melee" || applyTo === unit.missileWeapons[i].weaponName) {
                if(add) {
                    newWeapon = AbilityHelper.addOrRemoveWeaponEffect(unit, newEffect, targetStat, unit.missileWeapons[i], true);
                } else {
                    newWeapon = AbilityHelper.addOrRemoveWeaponEffect(unit, newEffect, targetStat, unit.missileWeapons[i], false);
                }
            }
            newMissileWeapons.push(newWeapon);
        }

        newUnit.missileWeapons = newMissileWeapons;
        newUnit.meleeWeapons = newMeleeWeapons;

        console.log(`addOrRemoveWeaponEffects about to return ${JSON.stringify(newUnit)}`)

        return newUnit;
    }

    //Called from addOrRemoveWeaponEffects when we found the right weapon to apply the effect to
    static addOrRemoveWeaponEffect(unit: Unit, newEffect: Effect, targetStat: string, weapon: Weapon, add: boolean) : Weapon {
        let newWeapon: Weapon = {...weapon};

        switch (targetStat) {
            case "attacks":
                if(add) {
                    newWeapon.attacksEffects = AbilityHelper.addEffectToArray(newEffect, weapon.attacksEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        newWeapon.attacks += newEffect.modValue as number;
                    }
                } else {
                    newWeapon.attacksEffects = AbilityHelper.removeEffectFromArray(newEffect, weapon.attacksEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        newWeapon.attacks -= newEffect.modValue as number;
                    }
                }
                break;

            case "toHit":
                if(add) {
                    //newWeapon.hitEffects = AbilityHelper.addEffectToArray(newEffect, weapon.hitEffects);
                    console.log(`add hit effect before: ${newWeapon.hitEffects}`);
                    newWeapon = {...weapon, hitEffects: this.addEffectToArray(newEffect, weapon.hitEffects)}
                    console.log(`add hit effect after: ${JSON.stringify(newWeapon.hitEffects)}`);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to hit actually takes a 4+ to hit to a 3+ to hit (also, cap at +/- 1 from base)
                        newWeapon.toHit -= newEffect.modValue as number;
                        newWeapon.toHit = Math.max(weapon.toHit, weapon.baseToHit - 1);
                        newWeapon.toHit = Math.min(weapon.toHit, weapon.baseToHit + 1);
                    }
                } else {
                    newWeapon.hitEffects = AbilityHelper.removeEffectFromArray(newEffect, weapon.hitEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to hit actually takes a 4+ to hit to a 3+ to hit (also, cap at +/- 1 from base)
                        newWeapon.toHit += newEffect.modValue as number;
                        newWeapon.toHit = Math.max(weapon.toHit, weapon.baseToHit - 1);
                        newWeapon.toHit = Math.min(weapon.toHit, weapon.baseToHit + 1);
                    }
                }
                break;

            case "toWound":
                if(add) {
                    //weapon.woundEffects = AbilityHelper.addEffectToArray(newEffect, weapon.woundEffects);
                    newWeapon = {...weapon, woundEffects: this.addEffectToArray(newEffect, weapon.woundEffects)}
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to wound actually takes a 4+ to a 3+ (also, cap at +/- 1 from base)
                        newWeapon.toWound -= newEffect.modValue as number;
                        newWeapon.toWound = Math.max(newWeapon.toWound, newWeapon.baseToWound - 1);
                        newWeapon.toWound = Math.min(newWeapon.toWound, newWeapon.baseToWound + 1);
                    }
                } else {
                    newWeapon.woundEffects = AbilityHelper.removeEffectFromArray(newEffect, weapon.woundEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        //A +1 to wound actually takes a 4+ to a 3+ (also, cap at +/- 1 from base)
                        newWeapon.toWound += newEffect.modValue as number;
                        newWeapon.toWound = Math.max(weapon.toWound, weapon.baseToWound - 1);
                        newWeapon.toWound = Math.min(weapon.toWound, weapon.baseToWound + 1);
                    }
                }
                break;

            case "rend":
                if(add) {
                    newWeapon.rendEffects = AbilityHelper.addEffectToArray(newEffect, weapon.rendEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        newWeapon.rend += newEffect.modValue as number;
                    }
                } else {
                    newWeapon.rendEffects = AbilityHelper.removeEffectFromArray(newEffect, weapon.rendEffects);
                    if(newEffect.effectType === "STATMOD" && newEffect.modValue) {
                        newWeapon.rend -= newEffect.modValue as number;
                    }
                }
                break;

            case "damage":
                if(add) {
                    newWeapon.damageEffects = AbilityHelper.addEffectToArray(newEffect, weapon.damageEffects);
                } else {
                    newWeapon.damageEffects = AbilityHelper.removeEffectFromArray(newEffect, weapon.damageEffects);
                }
                //Since this is a string (to support D3 damage weapons) just remake the string taking into account all current effects
                newWeapon.damage = weapon.baseDamage;
                for (const element of weapon.damageEffects) {
                    if(element.effectType === "STATMOD" && element.modValue) {
                        newWeapon.damage += element.modValue.toString();
                    }
                }
                break;
        }

        console.log(`addOrRemoveWeaponEffect about to return ${JSON.stringify(newWeapon)}`)

        return newWeapon;
    }

    static addEffectToArray(element: Effect, array: Effect[]) : Effect[] {
        console.log(`AddEffect to Array: ${JSON.stringify(array)}`);
        return [...array, element];
    }

    static removeEffectFromArray(element: Effect, array: Effect[]) {
        const i = array.indexOf(element);
        return [...array.slice(0,i), ...array.slice(i+1)];
    }
}