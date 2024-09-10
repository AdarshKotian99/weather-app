import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root'
})
export class CityCardResolver implements Resolve<any> {
  constructor(private weatherService : WeatherService, private router : Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('inside CityCardResolver:-');
    return this.weatherService.getWeatherOfCity(route.params['city'])
    .catch((error) => {
      console.log('inside error block');
      console.log('error.status:-',error.status);
      if (error.status === 404) {
        console.log('re navigating:-');
        this.router.navigate(['/service/search'], { queryParams: { city: route.params['city'] } });
      }
      return null;
    });
  }
}
