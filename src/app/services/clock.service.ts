import { Injectable } from '@angular/core';
import { interval, Observable,share,startWith,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  clock : Observable<Date>;
  constructor() { 
    this.clock = interval(1000).pipe(startWith(0),map(() => new Date()),share());
  }

  getTime():Observable<Date>{
    return this.clock;
  }
}
