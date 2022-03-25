import { Ability } from "./Ability";
import { AbilityHelper } from "./AbilityHelper";
import { Effect } from "./Effect";
import { Unit } from "./Unit";
import { UnitData } from "./UnitData";
import { Weapon } from "./Weapon";
import { WeaponData } from "./WeaponData";

export class ObjectFactory {

    static unitCount = 0;

    static createAbility() : Ability {
        let ability: Ability = {
            abilityName: "",
            commandAbility: false,
            spell: false,
            targetRestrictions: [],
            abilitySource: "",
            abilityShortText: "",
            abilityFullText: "",
            phase: [],
            showOn: [],
            conditionText: "",
            isActive: false,
            effects: []
        };
        return ability;
    }

    static initializeAbility(data: Ability): Ability {
        let newAbility: Ability = ObjectFactory.createAbility();
        newAbility.abilityName = data.abilityName;
        if(data.commandAbility){
            newAbility.commandAbility = true;
            newAbility.targetRestrictions = <string[]>data.targetRestrictions;
        } else {
            newAbility.commandAbility = false;
            newAbility.targetRestrictions = [];
        }
        if(data.spell){
            newAbility.spell = true;
        } else {
            newAbility.spell = false;
        }
        newAbility.abilitySource = data.abilitySource;
        newAbility.abilityShortText = data.abilityShortText;
        newAbility.abilityFullText = data.abilityFullText;
        newAbility.phase = data.phase;
        newAbility.sourceUnit = data.sourceUnit;
        newAbility.showOn = data.showOn;

        if(data.conditionText) {
            newAbility.conditionText = data.conditionText;
            newAbility.isActive = false;
        } else if (newAbility.commandAbility || newAbility.spell) {
            newAbility.conditionText = "";
            newAbility.isActive = false;
        } else {
            newAbility.conditionText = "";
            newAbility.isActive = true;
        }

        newAbility.effects = new Array<Effect>();
        if(data.effects) {
            for(let i = 0; i < data.effects.length; i++){
                newAbility.effects.push(data.effects[i]);
            }
        }
        return newAbility;
    }

    static createWeapon() : Weapon {
        let weapon: Weapon = {
            weaponName: "",
            isMount: false,
            range: "",
        
            baseAttacks: 0,
            attacks: 0,
            attacksEffects: [],
        
            baseToHit: 0,
            toHit: 0,
            hitEffects: [],
        
            baseToWound: 0,
            toWound: 0,
            woundEffects: [],
        
            baseRend: 0,
            rend: 0,
            rendEffects: [],
        
            baseDamage: "",
            damage: "",
            damageEffects: []
        };
        return weapon;
    }

    static createWeaponFromData(data: WeaponData) : Weapon {
        let newWeapon: Weapon = ObjectFactory.createWeapon();
        newWeapon.weaponName = data.weaponName;
        newWeapon.isMount  = data.isMount;
        newWeapon.range = data.range;

        newWeapon.baseAttacks = data.baseAttacks;
        if(Array.isArray(newWeapon.baseAttacks)) {
            newWeapon.attacks = newWeapon.baseAttacks[0];
        } else {
            newWeapon.attacks = newWeapon.baseAttacks;
        }

        newWeapon.baseToHit = data.baseToHit;
        if(Array.isArray(newWeapon.baseToHit)) {
            newWeapon.toHit = newWeapon.baseToHit[0];
        } else {
            newWeapon.toHit = newWeapon.baseToHit;
        }

        newWeapon.baseToWound = data.baseToWound;
        if(Array.isArray(newWeapon.baseToWound)) {
            newWeapon.toWound = newWeapon.baseToWound[0];
        } else {
            newWeapon.toWound = newWeapon.baseToWound;
        }

        newWeapon.baseRend = data.baseRend;
        if(Array.isArray(newWeapon.baseRend)) {
            newWeapon.rend = newWeapon.baseRend[0];
        } else {
            newWeapon.rend = newWeapon.baseRend;
        }

        newWeapon.baseDamage = data.baseDamage;
        if(Array.isArray(newWeapon.baseDamage)) {
            newWeapon.damage = newWeapon.baseDamage[0];
        } else {
            newWeapon.damage = newWeapon.baseDamage;
        }

        newWeapon.attacksEffects = new Array<Effect>();
        newWeapon.hitEffects = new Array<Effect>();
        newWeapon.woundEffects = new Array<Effect>();
        newWeapon.rendEffects = new Array<Effect>();
        newWeapon.damageEffects = new Array<Effect>();

        return newWeapon;
    }

    static createUnit() : Unit {
        let unit: Unit = {
            unitName: "",
            keywords: [],
        
            baseMove: 0,
            move: 0,
            moveEffects: [],
        
            baseSave: 0,
            save: 0,
            saveEffects: [],
        
            baseBravery: 0,
            bravery: 0,
            braveryEffects: [],
        
            baseWounds: 0,
            wounds: 0,
            woundsEffects: [],
            woundsTaken: 0,
        
            missileWeapons: [],
            meleeWeapons: [],
            abilities: []
        };
        return unit;
    }

    static createUnitFromData(data: UnitData, loadoutName: string) : Unit {
        let newUnit: Unit = ObjectFactory.createUnit();
        newUnit.unitName = data.unitName;
        newUnit.keywords = data.keywords;

        newUnit.baseMove = data.baseMove;
        if(Array.isArray(newUnit.baseMove)) {
            newUnit.move = newUnit.baseMove[0];
        } else {
            newUnit.move = newUnit.baseMove;
        }
        

        newUnit.baseSave = data.baseSave;
        if(Array.isArray(newUnit.baseSave)) {
            newUnit.save = newUnit.baseSave[0];
        } else {
            newUnit.save = newUnit.baseSave;
        }

        newUnit.baseBravery = data.baseBravery;
        newUnit.bravery = newUnit.baseBravery;

        newUnit.baseWounds = data.baseWounds;
        newUnit.wounds = newUnit.baseWounds;

        newUnit.moveEffects = new Array<Effect>();
        newUnit.saveEffects = new Array<Effect>();
        newUnit.braveryEffects = new Array<Effect>();
        newUnit.woundsEffects = new Array<Effect>();

        newUnit.missileWeapons = new Array<Weapon>();
        for(let i = 0; i < data.missileWeapons.length; i++) {
            newUnit.missileWeapons.push(ObjectFactory.createWeaponFromData(data.missileWeapons[i]));
        }

        newUnit.meleeWeapons = new Array<Weapon>();
        for(let i = 0; i < data.meleeWeapons.length; i++) {
            newUnit.meleeWeapons.push(ObjectFactory.createWeaponFromData(data.meleeWeapons[i]));
        }

        newUnit.abilities = new Array<Ability>();
        for (const ability of data.abilities) {
            let newAbility: Ability = ObjectFactory.initializeAbility(ability);
            //apply all effects that this unit grants to itself
            newUnit = AbilityHelper.addAbilityToUnit(newAbility, newUnit);
        }

        //If this unit has loadouts (i.e. a loadout was supplied), add the appropriate weapons and abilities from the loadout as well
        if(data.loadouts && loadoutName !== "") {
            for (const loadout of data.loadouts) {
                if(loadout.loadoutName === loadoutName) {
                    if(loadout.missileWeapons) {
                        for(let i = 0; i < loadout.missileWeapons.length; i++) {
                            newUnit.missileWeapons.push(ObjectFactory.createWeaponFromData(loadout.missileWeapons[i]));
                        }
                    }
                    if(loadout.meleeWeapons) {
                        for(let i = 0; i < loadout.meleeWeapons.length; i++) {
                            newUnit.meleeWeapons.push(ObjectFactory.createWeaponFromData(loadout.meleeWeapons[i]));
                        }
                    }
                    if(loadout.abilities) {
                        for (const ability of loadout.abilities) {
                            let newAbility: Ability = ObjectFactory.initializeAbility(ability);
                            //apply all effects that this unit grants to itself
                            newUnit = AbilityHelper.addAbilityToUnit(newAbility, newUnit);
                        }
                    }
                }
            }
        }

        return newUnit;
    }

}