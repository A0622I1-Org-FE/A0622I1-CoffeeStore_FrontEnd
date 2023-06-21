import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPasswordChangeDTO} from '../dto/IPasswordChangeDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_ACCOUNT = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) {
  }


  changePassword(obj): Observable<any> {
    console.log(obj);
    return this.http.post(this.API_ACCOUNT + 'change-password', {
      userName: obj.userName,
      currentPassword: obj.currentPassword,
      newPassword: obj.newPassword,
    }, this.httpOptions);
  }
}
