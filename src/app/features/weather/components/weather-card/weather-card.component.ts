import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherTip } from '../../models/weather-tip.model';
import { WeatherStatus } from '../../models/weather-status.model';

@Component({
  selector: 'app-weather-card',
  standalone: true, // This component is standalone, no need to be declared in a module
  imports: [CommonModule], // Imports CommonModule for common Angular directives
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  // Injects the WeatherService to fetch weather data and tips
  private weatherService = inject(WeatherService);

  // Properties to store temperature and humidity values; initialized as null
  temperature: number | null = null;
  humidity: number | null = null;
  // Property to hold a weather tip string
  tip: string = '';

  ngOnInit(): void {
    // On component initialization, subscribe to weather data and tips from the service
    this.weatherService.getWeatherAndTip().subscribe(({ weather, tips }) => {
      // Set the temperature and humidity from the received weather data
      this.temperature = weather.temperature;
      this.humidity = weather.humidity;

      // Find a weather tip where current humidity falls within the tip’s humidity range
      const match = tips.find((t: WeatherTip) =>
          this.humidity! >= t.humidityRange[0] && this.humidity! <= t.humidityRange[1]
      );

      // Assign the matched tip, or a default message if none found
      this.tip = match ? match.tip : 'No recommendation available.';
    });
  }
}
