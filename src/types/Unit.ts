import { Ability } from './Ability';
import { Effect } from './Effect';
import { Loadout } from './Loadout';
import { Weapon } from './Weapon';

export interface Unit {
    unitName: string;
    keywords: string[];

    baseMove: number | number[];
    move: number;
    moveEffects: Effect[];

    baseSave: number | number[];
    save: number;
    saveEffects: Effect[];

    baseBravery: number;
    bravery: number;
    braveryEffects: Effect[];

    baseWounds: number;
    wounds: number;
    woundsEffects: Effect[];
    woundsTaken: number;

    missileWeapons: Weapon[];
    meleeWeapons: Weapon[];
    abilities: Ability[];
}
