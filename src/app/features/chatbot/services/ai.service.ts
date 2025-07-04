import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente experto en plantas.' },
        { role: 'user', content: question }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
