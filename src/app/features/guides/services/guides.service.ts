// src/app/features/guides/services/guides.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guide } from '../models/guide.model';
import { Observable } from 'rxjs';

//SERVICIOS QUE REALIZA LAS GUIAS
@Injectable({ providedIn: 'root' })
export class GuidesService {
    private apiUrl = 'http://localhost:3000/guides';

    constructor(private http: HttpClient) {}

    getGuides(): Observable<Guide[]> {
        return this.http.get<Guide[]>(this.apiUrl);
    }

    getGuideById(id: number): Observable<Guide> {
        return this.http.get<Guide>(`${this.apiUrl}/${id}`);
    }
}
