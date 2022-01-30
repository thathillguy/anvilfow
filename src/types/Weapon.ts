import { Effect } from "./Effect";

export interface Weapon {
    weaponName: string;
    isMount: boolean;
    range: string;

    baseAttacks: number | number[];
    attacks: number;
    attacksEffects: Effect[];

    baseToHit: number | number[];
    toHit: number;
    hitEffects: Effect[]

    baseToWound: number | number[];
    toWound: number;
    woundEffects: Effect[];

    baseRend: number | number[];
    rend: number;
    rendEffects: Effect[];

    baseDamage: string | string[];
    damage: string;
    damageEffects: Effect[];
}