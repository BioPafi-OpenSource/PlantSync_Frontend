import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { WeatherStatusService } from './weather-status.service';
import { WeatherTipService } from './weather-tip.service';
import { WeatherStatus} from "../models/weather-status.model";
import { WeatherTip} from "../models/weather-tip.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
      private weatherStatusService: WeatherStatusService,
      private weatherTipService: WeatherTipService
  ) {}

  getWeatherAndTip(): Observable<{ weather: WeatherStatus; tips: WeatherTip[] }> {
    return forkJoin({
      weather: this.weatherStatusService.getById(1),
      tips: this.weatherTipService.getAll()
    });
  }
}
