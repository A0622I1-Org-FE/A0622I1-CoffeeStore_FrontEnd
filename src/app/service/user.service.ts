import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserResponse} from '../modal/UserResponse';
import {IUserInforDTO} from '../dto/IUserInforDTO';
import { Observable, throwError } from 'rxjs';
import { UserDTO } from '../dto/UserDTO';
import { UserEditDTO } from '../dto/UserEditDTO';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER = 'http://localhost:8080/api/private/find-user-infor';
  private API_URL = 'http://localhost:8080/api/private/listUser';
  private API_URL_DELETEUSER = 'http://localhost:8080/api/private/userDelete';
  private API_URL_SEARCHNAMORDATE = 'http://localhost:8080/api/private/getUserByNameOrBirthday';
  private API_USER_PUBLIC = 'http://localhost:8080/api/public';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
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
  findUserInforByToken(): Observable<IUserInforDTO> {
    return this.httpClient.get<IUserInforDTO>(this. API_USER, this.httpOptions);
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  createUser(userDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(this.API_USER_PUBLIC + '/create-user', JSON.stringify(userDTO), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  editUser(user, id): Observable<UserEditDTO> {
    return this.httpClient.put<UserEditDTO>(this.API_USER_PUBLIC + '/edit-user/' + id, user, this.httpOptions);
  }

  findById(id): Observable<UserEditDTO> {
    return this.httpClient.get<UserEditDTO>(this.API_USER_PUBLIC + '/find-id/' + id, this.httpOptions);
  }
}
