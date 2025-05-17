import { Injectable } from '@angular/core';
import { Guide } from '../models/guide.model';
import { BaseService } from "../../../shared/services/base.service";
import { environment } from "../../../../environments/environment.development";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'  // Service is provided at the root level, making it a singleton
})
export class GuidesService extends BaseService<Guide> {

    // Override the resource endpoint URL with the guides API path from environment config
    override resourceEndpoint: string = environment.ENDPOINT_PATH_GUIDES;

    constructor() {
        super();  // Call the constructor of the base service class
    }

    // Fetch all guides from the API, returns an Observable array of Guide objects
    getGuides(): Observable<Guide[]> {
        return this.getAll();
    }

    // Fetch a specific guide by its ID, returns an Observable of a single Guide object
    getGuideById(id: number): Observable<Guide> {
        return this.getById(id);
    }
}

