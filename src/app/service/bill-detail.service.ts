import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertBillDetailDTO} from '../dto/insert-bill-detail-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillDetailService {
  private API_URL_INSERT_BILL_DETAIL = 'http://localhost:8080/api/private/insert_bill_detail';
  constructor(private httpClient: HttpClient) { }
  insertBillDetail(insert: InsertBillDetailDTO): Observable<InsertBillDetailDTO> {
    const url = `${this.API_URL_INSERT_BILL_DETAIL}`;
    return this.httpClient.post<InsertBillDetailDTO>(url, insert);
  }
}
