import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { ResolveLocationService } from './services/resolve-location.service';
import { CityCardResolver } from './city-card/city-card.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path : '', component: WeatherComponent, resolve:{ weather :ResolveLocationService}},
  {path : ':city', component:WeatherComponent, resolve: {weather : CityCardResolver}},
  {path : 'service/search', component:NotFoundComponent},
  {path : '**' , component: ErrorComponent , data : {title : '404 Not Found', message : 'You may be lost. Follow the breadcrumbs back <a href="/">home</a>.'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
