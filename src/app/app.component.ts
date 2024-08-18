import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather-app';

  unitSystem!: string;

  constructor(private appService : AppService){
  }

  ngOnInit(){
    this.unitSystem = this.appService.getUnitSystem();
  }

  changeUnit(unitSystem:string){
    this.appService.updateUnitSystem(unitSystem);

  }
}
