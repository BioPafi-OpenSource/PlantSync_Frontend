import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantHistory } from '../models/plant-history.model';
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'  // This service can be injected throughout the application
})
export class PlantHistoryService {
  // Define the base URL for the plant history API endpoint
  private apiUrl = `${environment.BASE_URL}/plantHistory`;

  // Inject the HttpClient to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Fetch plant history records by plant ID
  // Sorts the records by date in descending order
  getPlantHistoryByPlantId(plantId: number): Observable<PlantHistory[]> {
    return this.http.get<PlantHistory[]>(`${this.apiUrl}?plantId=${plantId}&_sort=date&_order=desc`);
  }
}
