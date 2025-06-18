import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { WeatherStatus } from '../model/weather-status.model';
import { WeatherTip } from '../model/weather-tip.model';
import { RealWeatherService } from './real-weather.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private realWeatherService: RealWeatherService) {}

  getWeatherAndTip(): Observable<{ weather: WeatherStatus; tips: WeatherTip[] }> {
    const city = 'Lima';

    const weather$ = this.realWeatherService.getWeatherByCity(city);

    const tips: WeatherTip[] = [
      { humidityRange: [0, 30], tip: 'Riega tus plantas más seguido.' },
      { humidityRange: [31, 60], tip: 'Condiciones óptimas.' },
      { humidityRange: [61, 100], tip: 'Reduce el riego para evitar excesos de agua.' }
    ];
    const tips$ = of(tips);

    return forkJoin({ weather: weather$, tips: tips$ });
  }
}
