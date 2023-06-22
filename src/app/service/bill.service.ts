import {Injectable} from '@angular/core';
import {BillDTO} from '../dto/bill-dto';
import {Observable} from 'rxjs';
import {InsertBillDTO} from '../dto/insert-bill-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private API_URL_INSERT_BILL = 'http://localhost:8080/api/insert_bill';
  private API_URL_GET_BILL = 'http://localhost:8080/api/bill/table_id';

  constructor(private httpClient: HttpClient) {
  }

  insertBill(billDTO: InsertBillDTO): Observable<InsertBillDTO> {
    const url = `${this.API_URL_INSERT_BILL}`;
    return this.httpClient.post<InsertBillDTO>(url, billDTO);
  }

  getBill(tableId: number): Observable<BillDTO> {
    const url = `${this.API_URL_GET_BILL}/${tableId}`;
    return this.httpClient.get<BillDTO>(url);
  }
}
