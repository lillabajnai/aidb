import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Movie} from "../model/Movie";
import { environment } from '../../../environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  addMovie(movie: Movie) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('id', movie.id.toString());
    body.set('title', movie.title);
    body.set('year', movie.year.toString());
    body.set('image', movie.image);
    body.set('description', movie.description);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(API_URL + 'movie', body, {headers: headers});
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get(`${API_URL}movieById/${id}`);
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${API_URL}getAllMovies`);
  }
}
