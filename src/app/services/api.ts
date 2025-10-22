import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Api {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  getFeedback(limit: number = 10) {
    return this.http.get<any[]>(`${this.apiUrl}?_limit=${limit}`).pipe(
      map((data) =>
        data.map((u) => ({
          name: u.name,
          email: u.email,
          comment: u.body, 
        }))
      ),
      catchError((err) => {
        console.error('API error:', err);
        return throwError(() => new Error('Failed to fetch feedback'));
      })
    );
  }

}
