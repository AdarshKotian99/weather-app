import { Injectable } from '@angular/core';
import { interval, Observable, startWith, map, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  date!:Observable<Date>
  private locale = 'en-IN';
  constructor() {
    this.date = interval(10000).pipe(
      startWith(0),
      map(() => new Date()),
      share()
    );
  }

  getDate():Observable<Date>{
    return this.date;
  }

  formatDate(date:Date):string{
    const month = date.toLocaleDateString(this.locale,{month : 'short'});
    const weekday = date.toLocaleDateString(this.locale,{weekday : 'short'});
    const day = date.toLocaleDateString(this.locale,{day :'numeric'});
    return `${weekday} ${month} ${day}`;
  }
}
