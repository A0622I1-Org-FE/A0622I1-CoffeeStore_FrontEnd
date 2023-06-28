import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {AuthInterceptor} from './auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private API_ACCOUNT = 'http://localhost:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) {
  }
  changePasswordRequest(obj): Observable<any> {
    return this.http.post(this.API_ACCOUNT + 'change-password-request', {
      userName: '',
      currentPassword: obj.currentPassword,
      newPassword: obj.newPassword,
    }, this.httpOptions);
  }

}
