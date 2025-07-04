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
