import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserDTO } from '../dto/UserDTO';
import { catchError } from "rxjs/operators";
import { UserEditDTO } from '../dto/UserEditDTO';
import { ToastrService } from 'ngx-toastr';
import {UserResponse} from '../modal/UserResponse';
import {IUserInforDTO} from '../dto/IUserInforDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER: string = 'http://localhost:8080/api/public';
  private API_URL = 'http://localhost:8080/api/listUser';
  private API_URL_DELETEUSER = 'http://localhost:8080/api/userDelete';
  private API_URL_SEARCHNAMORDATE = 'http://localhost:8080/api/getUserByNameOrBirthday';
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


  createUser(userDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(this.API_USER + '/create-user', JSON.stringify(userDTO), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  editUser(user, id): Observable<UserEditDTO> {
    return this.httpClient.put<UserEditDTO>(this.API_USER + '/edit-user/' + id, user, this.httpOptions);
  }

  findById(id): Observable<UserEditDTO> {
    return this.httpClient.get<UserEditDTO>(this.API_USER + '/find-id/' + id, this.httpOptions);
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
    return this.httpClient.get<IUserInforDTO>(this. API_USER + '/find-user-infor', this.httpOptions);
  }
}
