import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from "../model/Rating";
import { environment } from '../../../environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private http: HttpClient) {}

  addRating(rating: Rating) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('rating', rating.rating.toString());
    body.set('comment', rating.comment);
    body.set('isCritical', rating.isCritical.toString());
    body.set('userId', rating.userId);
    body.set('movieId', rating.movieId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/rating', body, {headers: headers});
  }

  getUserRatings(movieId: string): Observable<any> {
    return this.http.get(`${API_URL}getUserRatings?movieId=${movieId}`);
  }

  getCritiqueRatings(movieId: string): Observable<any> {
    return this.http.get(`${API_URL}getCritiqueRatings?movieId=${movieId}`);
  }

  delete(id: string) {
    return this.http.delete(API_URL + 'deleteRating?id=' + id, {withCredentials: true});
  }
}
