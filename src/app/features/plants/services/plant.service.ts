import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { BaseService } from "../../../shared/services/base.service";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'  // This service is provided at the root level and can be injected anywhere in the app
})
export class PlantService extends BaseService<Plant> {

  // Override the base service resource endpoint with the plants API endpoint from environment config
  override resourceEndpoint: string = environment.ENDPOINT_PATH_PLANTS;

  constructor() {
    super();  // Call the constructor of the base service
  }

  // Explicit functions reusing the base service logic

  // Retrieve all plants
  getPlants() {
    return this.getAll();
  }

  // Retrieve a single plant by its ID
  getPlantById(id: number | string) {
    return this.getById(id);
  }

  // Add a new plant; omit the 'id' property as it will be assigned by the backend
  addPlant(plant: Omit<Plant, 'id'>) {
    return this.create(plant as Plant);
  }

  // Update an existing plant by ID
  updatePlant(id: number | string, plant: Plant) {
    return this.update(id, plant);
  }

  // Delete a plant by ID
  deletePlant(id: number | string) {
    return this.delete(id);
  }

  // Retrieve plants filtered by user ID (e.g., plants belonging to a specific user)
  getPlantsByUserId(userId: number | string) {
    return this.getByQuery('userId', userId);
  }

}

