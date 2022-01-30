import { Unit } from "./Unit";
import { Weapon } from "./Weapon";

export class ArrayValueHelper {
    static getBaseValueNum(unit: Unit, base: (number | number[])): number {
        if(Array.isArray(base)) {
            //if beyond the last value in the array, use the last array value
            if (unit.woundsTaken >= base.length) {
                return base[base.length - 1];
            } else if (unit.woundsTaken >= 0) {
                //use the array value that corresponds to wounds taken
                return base[unit.woundsTaken];
            } else {
                //shouldnt really ever get here but w/e
                return base[0];
            }
        } else {
            return base;
        }
    }

    static getBaseValueStr(unit: Unit, base: (string | string[])): string {
        if(Array.isArray(base)) {
            //if beyond the last value in the array, use the last array value
            if (unit.woundsTaken >= base.length) {
                return base[base.length - 1];
            } else if (unit.woundsTaken >= 0) {
                //use the array value that corresponds to wounds taken
                return base[unit.woundsTaken];
            } else {
                //shouldnt really ever get here but w/e
                return base[0];
            }
        } else {
            return base;
        }
    }

    static updateArrayValues(unit: Unit) : Unit {
        let newUnit = {...unit};
        if (Array.isArray(newUnit.baseMove)) {
            newUnit.move = ArrayValueHelper.getBaseValueNum(newUnit, newUnit.baseMove);
        }
        let newMeleeWeapons: Weapon[] = [];
        let newMissileWeapons: Weapon[] = [];
    
        for(let i = 0; i < unit.missileWeapons.length; i++) {
            newMissileWeapons.push(this.updateWeaponArrayValues(unit, unit.missileWeapons[i]));
        }
        for(let i = 0; i < unit.meleeWeapons.length; i++) {
            newMeleeWeapons.push(this.updateWeaponArrayValues(unit, unit.meleeWeapons[i]));
        }
        newUnit.missileWeapons = newMissileWeapons;
        newUnit.meleeWeapons = newMeleeWeapons;
        return newUnit;
    }

    static updateWeaponArrayValues(unit: Unit, weapon: Weapon) : Weapon {
        let newWeapon : Weapon = {...weapon};
        if (Array.isArray(newWeapon.baseAttacks)) {
            newWeapon.attacks = ArrayValueHelper.getBaseValueNum(unit, newWeapon.baseAttacks);
        }
        if (Array.isArray(newWeapon.baseToHit)) {
            newWeapon.toHit = ArrayValueHelper.getBaseValueNum(unit, newWeapon.baseToHit);
        }
        if (Array.isArray(newWeapon.baseToWound)) {
            newWeapon.toWound = ArrayValueHelper.getBaseValueNum(unit, newWeapon.baseToWound);
        }
        if (Array.isArray(newWeapon.baseRend)) {
            newWeapon.rend = ArrayValueHelper.getBaseValueNum(unit, newWeapon.baseRend);
        }
        if (Array.isArray(newWeapon.baseDamage)) {
            newWeapon.damage = ArrayValueHelper.getBaseValueStr(unit, newWeapon.baseDamage);
        }
        return newWeapon;
    }
}