import { Ability } from "./Ability";
import { AbilityData } from "./AbilityData";
import { AbilityHelper } from "./AbilityHelper";
import { Effect } from "./Effect";
import { EffectData } from "./EffectData";
import { Unit } from "./Unit";
import { UnitData } from "./UnitData";
import { Weapon } from "./Weapon";
import { WeaponData } from "./WeaponData";

export class ObjectFactory {

    static createEffect() : Effect {
        let effect: Effect = {effectType: "", stat: "", effectText: ""};
        return effect;
    }

    static createEffectFromData(data: EffectData): Effect {
        let newEffect: Effect = ObjectFactory.createEffect();
        newEffect.effectType = data.effectType;
        newEffect.stat = data.stat;
        newEffect.effectText = data.effectText;
    
        if(data.effectType === "TRIGGER") {
            newEffect.triggerRollValue = data.triggerRollValue;
        } else if (data.effectType === "REROLL") {
            newEffect.onlyReroll1s = data.onlyReroll1s;
        } else if (data.effectType === "STATMOD") {
            newEffect.modValue = data.modValue;
        }
        return newEffect;
    }

    static createAbility() : Ability {
        let ability: Ability = {
            abilityName: "",
            commandAbility: false,
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

    static createAbilityFromData(data: AbilityData): Ability {
        let newAbility: Ability = ObjectFactory.createAbility();
        newAbility.abilityName = data.abilityName;
        if(data.commandAbility){
            newAbility.commandAbility = true;
            newAbility.targetRestrictions = <string[]>data.targetRestrictions;
        } else {
            newAbility.commandAbility = false;
            newAbility.targetRestrictions = [];
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
        } else if (newAbility.commandAbility) {
            newAbility.conditionText = "";
            newAbility.isActive = false;
        } else {
            newAbility.conditionText = "";
            newAbility.isActive = true;
        }

        newAbility.effects = new Array<Effect>();
        console.log(`Ability Constructor: effects ${data.effects}`);
        if(data.effects) {
            console.log(`Ability Constructor: effects ${data.effects.length}`);
            for(let i = 0; i < data.effects.length; i++){
                newAbility.effects.push(ObjectFactory.createEffectFromData(data.effects[i]));
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
        newWeapon.attacks = newWeapon.baseAttacks;

        newWeapon.baseToHit = data.baseToHit;
        newWeapon.toHit = newWeapon.baseToHit;

        newWeapon.baseToWound = data.baseToWound;
        newWeapon.toWound = newWeapon.baseToWound;

        newWeapon.baseRend = data.baseRend;
        newWeapon.rend = newWeapon.baseRend;

        newWeapon.baseDamage = data.baseDamage;
        newWeapon.damage = newWeapon.baseDamage;

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

    static createUnitFromData(data: UnitData) : Unit {
        let newUnit: Unit = ObjectFactory.createUnit();
        newUnit.unitName = data.unitName;
        newUnit.keywords = data.keywords;

        newUnit.baseMove = data.baseMove;
        newUnit.move = newUnit.baseMove;

        newUnit.baseSave = data.baseSave;
        newUnit.save = newUnit.baseSave;

        newUnit.baseBravery = data.baseBravery;
        newUnit.bravery = newUnit.baseBravery;

        newUnit.baseWounds = data.baseWounds;
        newUnit.wounds = newUnit.baseWounds;

        newUnit.missileWeapons = new Array<Weapon>();
        for(let i = 0; i < data.missileWeapons.length; i++) {
            newUnit.missileWeapons.push(ObjectFactory.createWeaponFromData(data.missileWeapons[i]));
        }

        newUnit.meleeWeapons = new Array<Weapon>();
        for(let i = 0; i < data.meleeWeapons.length; i++) {
            newUnit.meleeWeapons.push(ObjectFactory.createWeaponFromData(data.meleeWeapons[i]));
        }

        newUnit.moveEffects = new Array<Effect>();
        newUnit.saveEffects = new Array<Effect>();
        newUnit.braveryEffects = new Array<Effect>();
        newUnit.woundsEffects = new Array<Effect>();

        newUnit.abilities = new Array<Ability>();
        for (const ability of data.abilities) {
            let newAbility: Ability = ObjectFactory.createAbilityFromData(ability);
            //apply all effects that this unit grants to itself
            AbilityHelper.addAbilityToUnit(newAbility, newUnit);
        }

        return newUnit;
    }

}