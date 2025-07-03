import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherTip } from '../../model/weather-tip.model';


@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  private weatherService = inject(WeatherService);

  temperature: number | null = null;
  humidity: number | null = null;
  tip: string = '';

  ngOnInit(): void {
    this.weatherService.getWeatherAndTip().subscribe(({ weather, tips }) => {
      this.temperature = weather.temperature;
      this.humidity = weather.humidity;

      const match = tips.find((t: WeatherTip) =>
          this.humidity! >= t.humidityRange[0] && this.humidity! <= t.humidityRange[1]
      );

      this.tip = match ? match.tip : 'No hay recomendación disponible.';
    });
  }
}
