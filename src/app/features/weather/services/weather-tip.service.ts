import { Injectable } from '@angular/core';
import { BaseService} from "../../../shared/services/base.service";
import { WeatherTip} from "../model/weather-tip.model";
import { environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class WeatherTipService extends BaseService<WeatherTip> {

  override resourceEndpoint: string = environment.ENDPOINT_PATH_WEATHER_TIPS;

  constructor() {
    super();
  }
}
