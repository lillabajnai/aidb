import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
  }

  getUser() {
    return this.http.get<User>('http://localhost:5000/app/getUser', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
  }

  makeCritique(id: string) {
    return this.http.post('http://localhost:5000/app/makeCritique?id=' + id, {withCredentials: true});
  }
}
