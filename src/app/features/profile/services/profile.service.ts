// src/app/shared/services/profile/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";
import { Profile} from "../model/profile.entity";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = `${environment.BASE_URL}/profiles`;

    constructor(private http: HttpClient) {}

    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this.apiUrl);
    }

    getProfileByUserId(userId: number): Observable<Profile[]> {
        return this.http.get<Profile[]>(`${this.apiUrl}?userId=${userId}`);
    }

    createProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(this.apiUrl, profile);
    }

    updateProfile(id: number, profile: Partial<Profile>): Observable<Profile> {
        return this.http.patch<Profile>(`${this.apiUrl}/${id}`, profile);
    }
}