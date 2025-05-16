import { Injectable } from '@angular/core';
import { BaseService} from "../../../shared/services/base.service";
import { WeatherStatus} from "../models/weather-status.model";
import { environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class WeatherStatusService extends BaseService<WeatherStatus> {

  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_STATUS;

  constructor() {
    super();
  }
}
