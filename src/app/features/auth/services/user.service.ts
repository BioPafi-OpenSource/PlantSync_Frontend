import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from "../../../shared/models/user";
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.BASE_URL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
