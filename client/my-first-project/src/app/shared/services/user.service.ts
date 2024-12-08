import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { environment } from '../../../environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(API_URL + 'getAllUsers', {withCredentials: true});
  }

  getUser() {
    return this.http.get<User>(API_URL + 'getUser', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete(API_URL + 'deleteUser?id=' + id, {withCredentials: true});
  }

  makeCritique(id: string) {
    return this.http.post(API_URL + 'makeCritique?id=' + id, {withCredentials: true});
  }
}
