import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosition } from '../modal/IPosition';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private baseURL = 'http://localhost:8080/api/private/position';
  constructor(
    private http: HttpClient
  ) {}
  findAll(): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(this.baseURL);
  }
}
