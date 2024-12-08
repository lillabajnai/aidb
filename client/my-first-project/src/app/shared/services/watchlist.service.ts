import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
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

      return this.http.post(API_URL + 'addMovie', body, {headers: headers});
    }

    return;
  }

  getWatchlist(id?: string): Observable<any> {
    return this.http.get(`${API_URL}getWatchlist/${id}`);
  }
}
