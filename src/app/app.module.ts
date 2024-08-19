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

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    SearchBarComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiSwitchModule
  ],
  providers: [
    AppService,
    HelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
