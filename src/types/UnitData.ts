import { Ability } from "./Ability";
import { WeaponData } from "./WeaponData";

export interface UnitData {
    unitName: string;
    keywords: string[];
    baseMove: number | number[];
    baseSave: number | number[];
    baseBravery: number;
    baseWounds: number;
    missileWeapons: WeaponData[];
    meleeWeapons: WeaponData[];
    abilities: Ability[];
}
