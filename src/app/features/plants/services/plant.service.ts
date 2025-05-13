import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { BaseService} from "../../../shared/services/base.service";
import { environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PlantService extends BaseService<Plant> {

  override resourceEndpoint: string = environment.ENDPOINT_PATH_PLANTS;

  constructor() {
    super();
  }

  // Funciones explícitas reutilizando la lógica base

  getPlants() {
    return this.getAll();
  }

  getPlantById(id: number | string) {
    return this.getById(id);
  }

  addPlant(plant: Omit<Plant, 'id'>) {
    return this.create(plant as Plant);
  }

  updatePlant(id: number | string, plant: Plant) {
    return this.update(id, plant);
  }

  deletePlant(id: number | string) {
    return this.delete(id);
  }
}
