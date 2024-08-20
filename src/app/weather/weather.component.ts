import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weather } from './weather';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit,OnDestroy {

  weather !: Weather;
  private _weatherSubscription!: Subscription;
  constructor(private route : ActivatedRoute , private weatherService: WeatherService) {  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        if(data['weather'] == null){
          //this.router.navigate(['/error']); //review logic
        }else{
          this.weather = data['weather'];
        } 
      }
    );

    this._weatherSubscription = this.weatherService.getWeather().subscribe(weather => {
      this.weather = weather;
    });
  }

  ngOnDestroy(): void {
    this._weatherSubscription.unsubscribe();
  }

}
