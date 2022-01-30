export interface WeaponData {
    weaponName: string;
    isMount: boolean;
    range: string;
    baseAttacks: number | number[];
    baseToHit: number | number[];
    baseToWound: number | number[];
    baseRend: number | number[];
    baseDamage: string | string[];
}