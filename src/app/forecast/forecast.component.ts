import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Forecast } from './forecast';
import { ForecastService } from '../services/forecast.service';

export interface forecastByDay{
  dt:number;
  temp:{
    day:number;
    night:number;
  };
  weather: {id:number;description:string}[];
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent implements  OnChanges, OnDestroy {
  @Input() cityName!: string;
  // @Input() longitude!: number;
  // @Input() latitude !: number;
  @Input() measureOfTemp!: string;

  private subscribers: any = {};
  firstWeekForecast : Forecast[] =[];
  secondWeekForecast : Forecast[] = [];
  isSecondWeekForecastListShow: boolean = false;
  forecastDays !: number;

  constructor(private forecastService : ForecastService) { }

  // ngOnInit(): void {
  //   this.getForecast();
  // }

  ngOnChanges ():void{
    if(this.subscribers.forecast){
      this.subscribers.forecast.unsubscribe();
    }
    this.getForecast();
  }

  getForecast():void{
    this.subscribers.forecast = this.forecastService.getForecastByCity(this.cityName)
    .subscribe((forecast) => {
      const forecastData = forecast.map((forecastByDay:any) => this.forecastService.handleResponseForecastData(forecastByDay));
      //console.log('forecastData:-',forecastData);
      this.firstWeekForecast = forecastData.slice(0,7);
      //console.log('this.firstWeekForecast:-',this.firstWeekForecast);
      this.secondWeekForecast = forecastData.slice(7,14);
      this.recalculateForecastDays();
    });
  }

  private recalculateForecastDays():void {
    this.forecastDays = this.isSecondWeekForecastListShow ? 14 : 7;
  }

  toggleSecondWeekForecastList(): void {
    this.isSecondWeekForecastListShow = !this.isSecondWeekForecastListShow;
    this.recalculateForecastDays();
  }

  ngOnDestroy(): void {
    this.subscribers.forecast.unsubscribe();
  } 

}
