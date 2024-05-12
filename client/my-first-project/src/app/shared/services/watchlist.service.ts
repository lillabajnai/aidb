import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from "../model/Rating";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = 'http://localhost:5000/app/';

  constructor(private http: HttpClient) {}

  addMovie(movieId: string, userId?: any) {
    console.log(movieId);
    console.log(userId);
    if(userId !== null) {
      const body = new URLSearchParams();
      body.set('watched', 'false');
      body.set('userId', userId);
      body.set('movieId', movieId);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      return this.http.post('http://localhost:5000/app/addMovie', body, {headers: headers});
    }

    return;
  }

  getWatchlist(userId?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}getWatchlist?userId=${userId}`);
  }

}
