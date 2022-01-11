import { AbilityData } from "./AbilityData";
import { WeaponData } from "./WeaponData";

export interface UnitData {
    unitName: string;
    keywords: string[];
    baseMove: number;
    baseSave: number;
    baseBravery: number;
    baseWounds: number;
    missileWeapons: WeaponData[];
    meleeWeapons: WeaponData[];
    abilities: AbilityData[];
}