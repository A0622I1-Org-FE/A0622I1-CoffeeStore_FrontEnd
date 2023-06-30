import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserDTO } from '../dto/UserDTO';
import { catchError } from "rxjs/operators";
import { UserEditDTO } from '../dto/UserEditDTO';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER: string = 'http://localhost:8080/api/public';
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


}
