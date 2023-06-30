import { Injectable } from '@angular/core';
import { IAccount } from '../modal/IAccount';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL = 'http://localhost:8080/api/public/account';
  constructor(
    private http: HttpClient
  ) {}
  findAll(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.baseURL);
  }
}
