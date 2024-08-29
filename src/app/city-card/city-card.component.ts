import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { ClockService } from '../services/clock.service';
import { Subscription } from 'rxjs';
import { DateService } from '../services/date.service';
import { Weather } from '../weather/weather';
import { apiConfig } from '../config';


@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit,OnDestroy {
  @Input() weather !: Weather;
  @Input() unitSystem !: string;

  measureOfTemp !: string;
  measureOfWindSpeed !: string;
  measureOfPressure !: string;

  private clockSubscription!:Subscription;
  private dateSubscription!:Subscription;
  time!:Date;
  date!:string;
  constructor(private clockService : ClockService, private dateService : DateService) { }

  ngOnInit(): void {
    this.clockSubscription = this.clockService.getTime().subscribe(time => this.time = time);
    this.dateSubscription = this.dateService.getDate().subscribe(date => {
      this.date = this.dateService.formatDate(date);
    });
    const measurementUnits = apiConfig.measurementUnits[this.unitSystem as 'metric' | 'imperial'];
    this.measureOfTemp = measurementUnits.temperature;
    this.measureOfWindSpeed = measurementUnits.windSpeed;
    this.measureOfPressure = measurementUnits.pressure;
  }

  ngOnDestroy(): void {
      if(this.clockSubscription){
        this.clockSubscription.unsubscribe();
      }

      if(this.dateSubscription){
        this.dateSubscription.unsubscribe();
      }
  }  

}
