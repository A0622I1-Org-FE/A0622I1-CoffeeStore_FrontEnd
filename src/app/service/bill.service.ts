import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { IBillDetail } from '../modal/IBillDetail';
import { BillResponse } from '../modal/BillResponse';
import {InsertBillDTO} from '../dto/insert-bill-dto';
import {BillDTO} from '../dto/bill-dto';
import {ServiceRespone1} from '../modal/ServiceRespone1';


@Injectable({
  providedIn: 'root'
})
export class BillService {
  // private API_URL = 'http://localhost:8080/api/private/bill/list';
  private API_URL_BILL_DETAIL = 'http://localhost:8080/api/private/bill/billDetail';
  // private API_URL_SEARCH_USER = 'http://localhost:8080/api/private/bill/getListByUser';
  private API_URL_INSERT_BILL = 'http://localhost:8080/api/private/insert_bill';
  private API_URL_GET_BILL = 'http://localhost:8080/api/private/bill/table_id';
  private API_URL_LIST_BILL = 'http://localhost:8080/api/private/bill/listBill';

  constructor(private httpClient: HttpClient) { }

  // findAll(page: number, pageSize: number): Observable<BillResponse> {
  //   const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
  //   return this.httpClient.get<BillResponse>(url);
  // }

  findById(id: number): Observable<IBillDetail> {
    return this.httpClient.get<IBillDetail>(`${this.API_URL_BILL_DETAIL}/${id}`);
  }

  // searchUser(name: string, page: number, pageSize: number): Observable<BillResponse> {
  //   const url = `${this.API_URL_SEARCH_USER}?page=${page}&size=${pageSize}&name=${name}`;
  //   return this.httpClient.get<BillResponse>(url);
  // }

  insertBill(billDTO: InsertBillDTO): Observable<InsertBillDTO> {
    const url = `${this.API_URL_INSERT_BILL}`;
    return this.httpClient.post<InsertBillDTO>(url, billDTO);
  }

  getBill(tableId: number): Observable<BillDTO> {
    const url = `${this.API_URL_GET_BILL}/${tableId}`;
    return this.httpClient.get<BillDTO>(url);
  }

  getBillList(page: number, pageSize: number,
              SBillNo: string, sCreatedTimeF: string, sCreatedTimeT: string,
              sPaymentF: string, sPaymentT: string, sTableNo: string, sCreatedBy: string): Observable<BillResponse> {
    const url = this.API_URL_LIST_BILL +
      '?page=' + page + '&size=' + pageSize + '&billNo=' + SBillNo + '&createdDateF=' + sCreatedTimeF +
      '&createdDateT=' + sCreatedTimeT + '&createdBy=' + sCreatedBy + '&tableNo=' + sTableNo +
      '&paymentF=' + sPaymentF + '&paymentT=' + sPaymentT;
    return this.httpClient.get<BillResponse>(url);
  }
}
