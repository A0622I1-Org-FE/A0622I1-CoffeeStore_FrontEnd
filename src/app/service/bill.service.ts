import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBillDetail } from '../modal/IBillDetail';
import { BillResponse } from '../modal/BillResponse';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private API_URL = 'http://localhost:8080/api/bill/list';
  private API_URL_BILL_DETAIL = 'http://localhost:8080/api/bill/billDetail';
  private API_URL_SEARCH_USER = 'http://localhost:8080/api/bill/getListByUser';

  constructor(private httpClient:HttpClient) { }

  findAll(page: number, pageSize: number): Observable<BillResponse> {
    const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<BillResponse>(url);
  }

  findById(id: number): Observable<IBillDetail> {
    return this.httpClient.get<IBillDetail>(`${this.API_URL_BILL_DETAIL}/${id}`);
  }

  searchUser(name: string, page: number, pageSize: number): Observable<BillResponse> {
    const url = `${this.API_URL_SEARCH_USER}?page=${page}&size=${pageSize}&name=${"%"+name+"%"}`;
    return this.httpClient.get<BillResponse>(url);
  }
}
