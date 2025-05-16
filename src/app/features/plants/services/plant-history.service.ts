import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantHistory } from '../models/plant-history.model';
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PlantHistoryService {
  private apiUrl = `${environment.BASE_URL}/plantHistory`;

  constructor(private http: HttpClient) {}

  getPlantHistoryByPlantId(plantId: number): Observable<PlantHistory[]> {
    return this.http.get<PlantHistory[]>(`${this.apiUrl}?plantId=${plantId}&_sort=date&_order=desc`);
  }
}
