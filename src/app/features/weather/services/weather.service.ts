import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { WeatherStatusService } from './weather-status.service';
import { WeatherTipService } from './weather-tip.service';
import { WeatherStatus } from "../models/weather-status.model";
import { WeatherTip } from "../models/weather-tip.model";

@Injectable({
  providedIn: 'root'  // Makes this service available application-wide as a singleton
})
export class WeatherService {

  // Inject dependencies for fetching weather status and weather tips
  constructor(
      private weatherStatusService: WeatherStatusService,
      private weatherTipService: WeatherTipService
  ) {}

  /**
   * Retrieves both the current weather status and the weather tips concurrently.
   * Returns an Observable that emits an object containing:
   *  - weather: the current weather data (WeatherStatus)
   *  - tips: an array of weather tips (WeatherTip[])
   */
  getWeatherAndTip(): Observable<{ weather: WeatherStatus; tips: WeatherTip[] }> {
    return forkJoin({
      weather: this.weatherStatusService.getById(1),  // Fetch weather data by ID (e.g., location ID 1)
      tips: this.weatherTipService.getAll()            // Fetch all weather tips
    });
  }
}

