import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IUserInforDTO} from '../dto/IUserInforDTO';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) { }

  findUserInforById(id): Observable<IUserInforDTO> {
    return this.http.get<IUserInforDTO>(this. API_USER + '/find-user-id/' + id, this.httpOptions);
  }
}
