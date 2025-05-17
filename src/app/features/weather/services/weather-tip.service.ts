import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { WeatherTip } from "../models/weather-tip.model";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'  // This service is provided at the root level, making it a singleton throughout the app
})
export class WeatherTipService extends BaseService<WeatherTip> {

  // Specifies the API endpoint for weather tips using environment configuration
  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_TIPS;

  constructor() {
    super();  // Calls the constructor of the BaseService class
  }
}
