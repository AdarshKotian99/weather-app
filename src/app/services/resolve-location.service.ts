import { Injectable } from '@angular/core';
import { Observable,catchError,from,of } from 'rxjs';
import { WeatherService } from './weather.service';
import { Resolve } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ResolveLocationService implements Resolve<any>{

  constructor(private weatherService : WeatherService) { }

  resolve(): Observable<any>{
    return from(this.weatherService.getWeatherByСurrentLocation()).pipe(
      catchError((error) => {
        console.log(error);
        // Navigate to an error page or handle the error in some way
        //this.router.navigate(['/error']); // Navigate to an error page //review //handle it in weather component
        return of(null); // Return a safe default observable
      })
    )
  }
}
