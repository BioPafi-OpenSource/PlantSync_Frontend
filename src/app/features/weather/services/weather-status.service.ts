import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { WeatherStatus } from "../models/weather-status.model";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the app as a singleton
})
export class WeatherStatusService extends BaseService<WeatherStatus> {

  // Overrides the resource endpoint URL for weather status API calls using environment variables
  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_STATUS;

  constructor() {
    super();  // Calls the constructor of the BaseService class
  }
}
