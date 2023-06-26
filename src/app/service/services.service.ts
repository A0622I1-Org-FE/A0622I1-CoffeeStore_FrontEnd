import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServices} from '../modal/IServices';
import {ServiceRespone} from '../modal/ServiceRespone';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private API_URL = 'http://localhost:8080/api/list/service';
  private API_URL_TYPE = 'http://localhost:8080/api/type_id';
  private API_URL_SERVICE = 'http://localhost:8080/api/list/service_type';
  private API_URL_BEST_SELLER = 'http://localhost:8080/api/service/body/best';
  private API_URL_NEW_FOOD = 'http://localhost:8080/api/service/body/new';

  constructor(private httpClient: HttpClient) {
  }

  getListBestSeller(): Observable<IServices[]> {
    return this.httpClient.get<IServices[]>(this.API_URL_BEST_SELLER);
  }

  getListNewFood(): Observable<IServices[]> {
    return this.httpClient.get<IServices[]>(this.API_URL_NEW_FOOD);
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
