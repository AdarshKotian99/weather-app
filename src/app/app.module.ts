import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AppService } from './services/app.service';
import { WeatherComponent } from './weather/weather.component';
import { HelperService } from './services/helper.service';
import { HttpClientModule } from '@angular/common/http';
import { CityCardComponent } from './city-card/city-card.component';
import { ResolveLocationService } from './services/resolve-location.service';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastItemComponent } from './forecast-item/forecast-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    SearchBarComponent,
    WeatherComponent,
    CityCardComponent,
    ForecastComponent,
    ForecastItemComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiSwitchModule,
    HttpClientModule
  ],
  providers: [
    AppService,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
