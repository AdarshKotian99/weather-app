import { Injectable } from '@angular/core';
import { interval, Observable, startWith, map, switchMap, catchError,throwError } from 'rxjs';
import { apiConfig } from '../config';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Forecast } from '../forecast/forecast';
import { WeatherService } from './weather.service';
import { HelperService } from './helper.service';
import { WeatherIconService } from './weather-icon.service';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private forecastUpdateInterval = apiConfig.updateInterval.forecast;
  private unitSystem: string;
  constructor(
    private http : HttpClient, 
    private appService : AppService, 
    private weatherService : WeatherService,
    private helperService : HelperService,
    private weatherIconService : WeatherIconService
  ) {
    this.unitSystem = appService.getUnitSystem();
  }


  getForecastByCity(city:string):Observable<any>{
    return interval(this.forecastUpdateInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get<any>(`${apiConfig.host}/forecast/?q=${city}&cnt=${apiConfig.amountForecastDays}&units=${this.unitSystem}&appid=${apiConfig.appId}`)
      .pipe(map((data) => data.list),
       catchError(this.handleError) )
      )
    );
  }


  private handleError(error: any): Observable<any> {
    return throwError(() => error.message || error);
  }

  handleResponseForecastData(responseData: any): Forecast{
    const{dt,main,weather} = responseData;
    const currentWeatherTimestamp = this.weatherService.getCurrentWeatherTimestamp();
    const currentDay = this.helperService.isItCurrentDayByTimestamps(dt,currentWeatherTimestamp);
    const date = dt * 1000; //converting from unix timestamp
    //console.log('date:-',date);
    const iconClassname = this.weatherIconService.getIconClassNameByCode(weather[0].id);

    const temperatureDay = Math.round(main.temp_max);
    const temperatureNight = Math.round(main.temp_min);
    return new Forecast(
      currentDay,
      date,
      iconClassname,
      temperatureDay,
      temperatureNight,
      weather[0].description
    );
  }
}