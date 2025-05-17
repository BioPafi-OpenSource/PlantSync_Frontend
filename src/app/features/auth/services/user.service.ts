
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../../../shared/models/user";
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";

@Injectable({
  // Makes this service available application-wide (singleton)
  providedIn: 'root'
})
export class UserService {
  // Define the base URL for the users API endpoint
  private apiUrl = `${environment.BASE_URL}/users`;

  // Inject HttpClient to communicate with the backend
  constructor(private http: HttpClient) {}

  // Fetch all users from the API
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch users that match a specific email (usually only one or none)
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  // Register a new user by sending a POST request to the API
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
