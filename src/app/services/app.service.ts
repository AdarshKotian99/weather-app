import { Injectable } from '@angular/core';
import { appConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private unitSystem: string;

  private localStorageSet(key:string, value:string){
    localStorage.setItem(key,JSON.stringify(value));
  }

  private localStorageGet(key:string):any{
    let value = localStorage.getItem(key);
    if(value){
      value = JSON.parse(value);
    }
    return value;
  }

  constructor() {
    this.unitSystem = this.localStorageGet('unit') || appConfig.defaultUnit;
   }

  getUnitSystem():string{
    return this.unitSystem;
  }

  updateUnitSystem(unitSystem:string):void{
    this.localStorageSet('unit',unitSystem);
    setTimeout(() => window.location.reload(), 300);
  }
  


}
