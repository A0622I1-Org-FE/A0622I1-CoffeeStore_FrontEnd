import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../modal/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/api/listUser';
  private API_URL_DELETEUSER = 'http://localhost:8080/api/userDelete';
  private API_URL_SEARCHNAMORDATE = 'http://localhost:8080/api/getUserByNameOrBirthday';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page: number, pageSize: number): Observable<UserResponse> {
    const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<UserResponse>(url);
  }

  findImgUrlById(id: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API_URL_DELETEUSER}/${id}`);
  }

  searchDate(date: string, page: number, pageSize: number) {
    const url = `${this.API_URL_SEARCHNAMORDATE}?page=${page}&size=${pageSize}&date=${date}&name=${name}`;
    return this.httpClient.get<UserResponse>(url);
  }
}
