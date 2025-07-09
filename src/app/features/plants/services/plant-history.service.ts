import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantHistory } from '../model/plant-history.model';
import { environment } from "../../../../environments/environment.development";
import {BaseService} from "../../../shared/services/base.service";
import {PlantService} from "./plant.service";

@Injectable({
  providedIn: 'root'
})
export class PlantHistoryService extends BaseService<PlantHistory>{



  private apiUrl = `${this.serverBaseUrl}/plantHistories`;

  constructor() {
    super();
  }

  getPlantHistoryByPlantId(plantId: number): Observable<PlantHistory[]> {
    const url = `${this.apiUrl}/plantId?plantId=${plantId}`;
    return this.http.get<PlantHistory[]>(url);
  }

}
