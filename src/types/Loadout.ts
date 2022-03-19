import { Ability } from './Ability';
import { WeaponData } from './WeaponData';

export interface Loadout {
    loadoutName: string;
    missileWeapons?: WeaponData[];
    meleeWeapons?: WeaponData[];
    abilities?: Ability[];
}
