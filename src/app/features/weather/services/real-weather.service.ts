import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherStatus } from '../models/weather-status.model';

@Injectable({
    providedIn: 'root'
})
export class RealWeatherService {
    private apiKey = 'f2aae48671e29e04c682372baceebe65';
    private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) {}

    getWeatherByCity(city: string): Observable<WeatherStatus> {
        const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
        return this.http.get<any>(url).pipe(
            map(data => {
                const weather: WeatherStatus = {
                    id: 0,
                    location: data.name,
                    temperature: data.main.temp,
                    humidity: data.main.humidity
                };
                return weather;
            })
        );
    }
}
