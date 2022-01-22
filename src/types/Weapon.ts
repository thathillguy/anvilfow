import { Effect } from "./Effect";

export interface Weapon {
    weaponName: string;
    isMount: boolean;
    range: string;

    baseAttacks: number;
    attacks: number;
    attacksEffects: Effect[];

    baseToHit: number;
    toHit: number;
    hitEffects: Effect[]

    baseToWound: number;
    toWound: number;
    woundEffects: Effect[];

    baseRend: number;
    rend: number;
    rendEffects: Effect[];

    baseDamage: string;
    damage: string;
    damageEffects: Effect[];
}