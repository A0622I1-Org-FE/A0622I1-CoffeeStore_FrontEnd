import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '../modal/UserResponse';
import {IUserInforDTO} from '../dto/IUserInforDTO';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER = 'http://localhost:8080/api/private/find-user-infor';
  private API_URL = 'http://localhost:8080/api/private/listUser';
  private API_URL_DELETEUSER = 'http://localhost:8080/api/private/userDelete';
  private API_URL_SEARCHNAMORDATE = 'http://localhost:8080/api/private/getUserByNameOrBirthday';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private httpClient: HttpClient) {
  }

  findAll(page: number, pageSize: number): Observable<UserResponse> {
    const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<UserResponse>(url);
  }

  searchDateOrName(date: string, page: number, pageSize: number, name: string): Observable<UserResponse> {
    const url = `${this.API_URL_SEARCHNAMORDATE}?page=${page}&size=${pageSize}&date=${date}&name=${name}`;
    return this.httpClient.get<UserResponse>(url);
  }

  deleteById(id: number): Observable<string> {
    return this.httpClient.put<string>(`${this.API_URL_DELETEUSER}/${id}`, {});
  }


  findUserInforById(id): Observable<IUserInforDTO> {
    return this.httpClient.get<IUserInforDTO>(this.API_USER + '/find-user-id/' + '5', this.httpOptions);
  }

  findUserInforByToken(): Observable<IUserInforDTO> {
    return this.httpClient.get<IUserInforDTO>(this.API_USER, this.httpOptions);
  }
}
