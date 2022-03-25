import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ability } from '../../../types/Ability';
import { UnitData } from '../../../types/UnitData';
import { WeaponData } from '../../../types/WeaponData';
import { addUnitToArmy } from '../../store/app.actions';

@Component({
  selector: 'app-library-unit-viewer',
  templateUrl: './library-unit-viewer.component.html',
  styleUrls: ['./library-unit-viewer.component.less']
})
export class LibraryUnitViewerComponent implements OnInit {

    @Input() unit: UnitData | null = null;

    allMeleeWeapons: Map<string, WeaponData> = new Map<string, WeaponData>();
    allMissileWeapons: Map<string, WeaponData> = new Map<string, WeaponData>();
    allAbilities: Map<string, Ability> = new Map<string, Ability>();

    selectedLoadoutName : string = "";

    //Things to handle table-based values
    hasTable: boolean = false;
    tableWounds: string[] = [];
    tableTitles: string[] = [];
    tableValues: string[][] = [];
  
    constructor(private store: Store) {

    }
  
    ngOnInit(): void {
    }

    ngOnChanges(): void {
      if(this.unit) {
        this.allMeleeWeapons = this.getWeaponArray("melee");
        this.allMissileWeapons = this.getWeaponArray("missile");
        this.allAbilities = this.getAbilityArray();
        this.setupArrayTable()
      }
      console.log(`library unit viewer onChanges`);
    }

    //In the library, we want to just show table-based values in a table
    translateArrayValue(input: string | number | string[] | number[]): string {
      if(typeof input === "string" || typeof input === "number") {
        return input.toString();
      } else {
        return "SEE TABLE"
      }
    }

    getWeaponArray(type: string) : Map<string, WeaponData> {
      let combinedWeapons: Map<string, WeaponData> = new Map<string, WeaponData>();
      if(this.unit) {
        //Any normal entries should be added, because they count for both loadouts and nonloadouts
        if(type==="melee") {
          for(let i = 0; i < this.unit.meleeWeapons.length; i++) {
            combinedWeapons.set(this.unit.meleeWeapons[i].weaponName, this.unit.meleeWeapons[i])
          }
        } else {
          for(let i = 0; i < this.unit.missileWeapons.length; i++) {
            combinedWeapons.set(this.unit.missileWeapons[i].weaponName, this.unit.missileWeapons[i])
          }
        }

        if(this.unit.loadouts) {
          //If there are loadouts, compile them all into the list
          for(let i = 0; i < this.unit.loadouts.length; i++) {
            if(type==="melee" && this.unit.loadouts[i].meleeWeapons) {
              for(let j = 0; j < this.unit.loadouts[i].meleeWeapons!.length; j++) {
                combinedWeapons.set(this.unit.loadouts[i]!.meleeWeapons![j].weaponName, this.unit.loadouts[i].meleeWeapons![j])
              }
            } else if(type==="missile" && this.unit.loadouts[i].missileWeapons) {
              for(let j = 0; j < this.unit.loadouts[i].missileWeapons!.length; j++) {
                combinedWeapons.set(this.unit.loadouts[i].missileWeapons![j].weaponName, this.unit.loadouts[i].missileWeapons![j])
              }
            }
          }
        }
      }
      return combinedWeapons
    }

    getAbilityArray() : Map<string, Ability> {
      let combinedAbilities: Map<string, Ability> = new Map<string, Ability>();
      if(this.unit) {
        for(let i = 0; i < this.unit.abilities.length; i++) {
          combinedAbilities.set(this.unit.abilities[i].abilityName, this.unit.abilities[i]);
        }
        if(this.unit.loadouts) {
          //If there ARE loadouts, compile all abilities into one list
          for(let i = 0; i < this.unit.loadouts.length; i++) {
            if(this.unit.loadouts[i].abilities) {
              for(let j = 0; j < this.unit.loadouts[i].abilities!.length; j++) {
                combinedAbilities.set(this.unit.loadouts[i].abilities![j].abilityName, this.unit.loadouts[i].abilities![j]);
              }
            }
          }
        }
      }
      return combinedAbilities
    }


    //Scan through the unit's values. Set up array tables (if needed)
    setupArrayTable() {
      if(this.unit){
        this.hasTable = false;
        this.tableWounds = [];
        this.tableTitles = [];
        this.tableValues = [];
        let counter = 0;

        //Look through every possible stat for array values
        if(Array.isArray(this.unit.baseMove)) {
          this.tableWounds = this.buildWoundsTable(this.unit.baseMove);
          this.tableTitles[counter] = "Move";
          this.tableValues[counter] = this.translateArrayIntoTable(this.unit.baseMove);
          counter++;
        }
        if(Array.isArray(this.unit.baseSave)) {
          this.tableWounds = this.buildWoundsTable(this.unit.baseSave);
          this.tableTitles[counter] = "Save";
          this.tableValues[counter] = this.translateArrayIntoTable(this.unit.baseSave);
          counter++;
        }
        //Check missile weapons for array values
        for(let entry of Array.from(this.allMissileWeapons.entries())) {
          counter = this.setupArrayTableForWeapon(entry[1], counter);
        }
        //Check melee weapons for array values
        for(let entry of Array.from(this.allMeleeWeapons.entries())) {
          counter = this.setupArrayTableForWeapon(entry[1], counter);
        }
      }
    }

    setupArrayTableForWeapon(weaponData: WeaponData, counter: number): number {
      console.log(`Setting arrays for ${weaponData.weaponName}, counter is ${counter}`)
      if(Array.isArray(weaponData.baseAttacks)) {
        console.log("Attacks");
        this.tableWounds = this.buildWoundsTable(weaponData.baseAttacks);
        this.tableTitles[counter] = `${weaponData.weaponName} Attacks`;
        this.tableValues[counter] = this.translateArrayIntoTable(weaponData.baseAttacks);
        counter++;
      }
      if(Array.isArray(weaponData.baseToHit)) {
        console.log("Hit");
        this.tableWounds = this.buildWoundsTable(weaponData.baseToHit);
        this.tableTitles[counter] = `${weaponData.weaponName} To Hit`;
        this.tableValues[counter] = this.translateArrayIntoTable(weaponData.baseToHit);
        counter++;
      }
      if(Array.isArray(weaponData.baseToWound)) {
        console.log("Wound");
        this.tableWounds = this.buildWoundsTable(weaponData.baseToWound);
        this.tableTitles[counter] = `${weaponData.weaponName} To Wound`;
        this.tableValues[counter] = this.translateArrayIntoTable(weaponData.baseToWound);
        counter++;
      }
      if(Array.isArray(weaponData.baseRend)) {
        console.log("Rend");
        this.tableWounds = this.buildWoundsTable(weaponData.baseRend);
        this.tableTitles[counter] = `${weaponData.weaponName} Rend`;
        this.tableValues[counter] = this.translateArrayIntoTable(weaponData.baseRend);
        counter++;
      }
      if(Array.isArray(weaponData.baseDamage)) {
        console.log("Damage");
        this.tableWounds = this.buildWoundsTable(weaponData.baseDamage);
        this.tableTitles[counter] = `${weaponData.weaponName} Damage`;
        this.tableValues[counter] = this.translateArrayIntoTable(weaponData.baseDamage);
        counter++;
      }
      return counter;

    }

    buildWoundsTable(inputArray: string[] | number[]): string[] {
      //Only need to build the table once
      if(!this.hasTable) {
        this.hasTable = true;
        let newTable: string[] = [];
        let counter = 0;

        //We only need to add a new entry to the output each time the value changes
        let currentValue: string | number = "";
        let previousValue: string | number = inputArray[0];
        let startWoundsCount: string = "0";
        let endWoundsCount: string = "";
        for(let i = 0; i<inputArray.length; i++) {
          currentValue = inputArray[i];
          console.log(`i is ${i}, input value is ${inputArray[i]}, currentValue is ${currentValue}`);
          //Only do things when we're not looking at the same value as we had previously
          if(currentValue !== previousValue) {
              //value changed: make a new entry
              endWoundsCount = (i-1).toString();
              newTable[counter] = `${startWoundsCount}-${endWoundsCount}`;
              counter++;
              //start a new row:
              startWoundsCount = i.toString()
              previousValue = currentValue
          }
        }
        //After the last one, add one last row for the last entry
        newTable[counter] = `${startWoundsCount}+`;
        return newTable;
      } else {
        return this.tableWounds;
      }
    }

    translateArrayIntoTable(inputArray: string[] | number[]): string[] {
      let output: string[] = []
      let counter = 0;
      let currentValue: string | number = "";
      //We only need to add a new entry to the output each time the value changes
      for(let value of inputArray) {
        if(value !== currentValue) {
          output[counter] = value.toString();
          counter++
          currentValue = value;
        }
      }
      return output
    }

    onLoadoutSelect() {
      console.log(`Selected loadout is now ${this.selectedLoadoutName}`);
    }

    addUnitToArmy(unit: UnitData) {
      console.log(`blornk: ${unit.unitName}`)
      //If this unit has loadouts, make sure one is selected before adding to army
      if(this.unit){
        if((this.unit.loadouts && this.selectedLoadoutName !== "") || !this.unit.loadouts) {
          this.store.dispatch(addUnitToArmy({unitToAdd: unit, selectedLoadout: this.selectedLoadoutName}));
        }
      }
    }



  }