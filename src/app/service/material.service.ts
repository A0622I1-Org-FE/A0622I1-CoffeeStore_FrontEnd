import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMaterialDto} from '../modal/IMaterialDto';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private GET_ALL_MATERIAL = 'http://localhost:8080/api/private/service/material';
  constructor(
    private http: HttpClient
  ) {}
  findAll(): Observable<IMaterialDto[]> {
    return this.http.get<IMaterialDto[]>(this.GET_ALL_MATERIAL);
  }
}
