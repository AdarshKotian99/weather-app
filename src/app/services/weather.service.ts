import { Injectable } from '@angular/core';
import { Observable, switchMap,interval,startWith,map,Subject,catchError,throwError } from 'rxjs';
import { apiConfig,appConfig } from '../config';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Weather } from '../weather/weather';
import { WeatherIconService } from './weather-icon.service';
import { HelperService } from './helper.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherUpdateInterval = apiConfig.updateInterval.weather;
  private unitSystem!:string;
  private weather: Subject<Weather> = new Subject<Weather>();
  private currentWeatherTimestamp!: number;
  private subscribers: any = {};
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private weatherIconsService : WeatherIconService,
    private helperService : HelperService
  ) {
    this.unitSystem = appService.getUnitSystem();
   }
  
   getWeather(): Subject<Weather> {
    return this.weather;
  }
   getCurrentWeatherTimestamp(): number {
    return this.currentWeatherTimestamp;
  }

  getWeatherByСurrentLocation(): Promise<any>{
    //this.showLoader();
    if (this.subscribers.city) {
      this.subscribers.city.unsubscribe();
    }

    return new Promise((resolve,reject)=> {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.subscribers.city = this.getWeatherByLocation(latitude,longitude).subscribe((weather) => {
          resolve(weather);
          //resolve(weather.city);
          //this.hideLoader();
        });
      },(error) => {
        //if user doesn't gives access
        if (error.code === 1) {
          //default cordinates
          this.subscribers.city = this.getWeatherByLocation(appConfig.defaultCity.coord.latitude,appConfig.defaultCity.coord.longitude).subscribe((weather) => {
            resolve(weather);
            //resolve(weather.city);
            //this.hideLoader();
          });
        }else{
          console.error(error);
          //this.hideLoader();
        }
      }
    );
    });
  }


  getWeatherByLocation(latitude: number, longitude: number):Observable<any>{
    return interval(this.weatherUpdateInterval).pipe(
      startWith(0),
      switchMap(()=>
        this.http.get(`${apiConfig.host}/weather?lat=${latitude}&lon=${longitude}&units=${this.unitSystem}&appid=${apiConfig.appId}`)
        .pipe(
          map((data) => {
            const weather = this.handleResponseWeatherData(data);
            this.weather.next(weather);
            return weather;
          }),
          catchError(this.handleError)
        )
      )
    )
  }

  private handleResponseWeatherData(responseData: any):Weather{
    const { name, main, weather, wind, sys, dt } = responseData;
    this.currentWeatherTimestamp = dt;
    const updateAt = new Date().getTime();
    const iconClassname = this.weatherIconsService.getIconClassNameByCode(weather[0].id,sys.sunset);
    const temperature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressure = (this.unitSystem === appConfig.defaultUnit) ? this.helperService.getPressureInMmHg(pressureInHpa) : pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection = this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000;
    return new Weather(
      updateAt,
      name,
      iconClassname,
      temperature,
      main.humidity,
      pressure,
      weather[0].description,
      sunriseTime,
      sunsetTime,
      windDirection,
      wind.speed,
      windBeaufortScale
    );
  }

  private handleError(error: any): Observable<any> {
    return throwError(() => error.message || error);
  }

  // private showLoader(): void {
  //   this.loaderService.show();
  // }

  // private hideLoader(): void {
  //   this.loaderService.hide();
  // }
}
