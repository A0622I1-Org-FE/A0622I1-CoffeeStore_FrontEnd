import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceRespone} from '../modal/ServiceRespone';
import {IServices} from '../modal/IServices';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private API_URL = 'http://localhost:8080/api/list/service';
  private API_URL_TYPE = 'http://localhost:8080/api/type_id';
  private API_URL_SERVICE = 'http://localhost:8080/api/list/service_type';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page: number, pageSize: number): Observable<ServiceRespone> {
    const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<ServiceRespone>(url);
  }

  searchTypeId(id: number, page: number, pageSize: number): Observable<ServiceRespone> {
    const url = `${this.API_URL_TYPE}?id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<ServiceRespone>(url);
  }

  serviceById(id: number): Observable<IServices> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<IServices>(url);
  }
}
