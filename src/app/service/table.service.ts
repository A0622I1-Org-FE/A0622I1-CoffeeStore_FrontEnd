import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITable} from '../modal/ITable';
import {IBillDetailListDTO} from "../modal/dto/IBillDetailListDTO";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private getAllTableAPI = 'http://localhost:8080/sales';
  private getBillDetailAPI = 'http://localhost:8080/sales/bill/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ITable[]> {
    return this.httpClient.get<ITable[]>(this.getAllTableAPI);
  }

  getBillDetailByTableId(tableId: number): Observable<IBillDetailListDTO[]> {
    return this.httpClient.get<IBillDetailListDTO[]>(this.getBillDetailAPI + tableId);
  }
}
