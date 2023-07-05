import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITable} from '../modal/ITable';
import {IBillDetailListDTO} from '../modal/dto/IBillDetailListDTO';
import {IBillChargingDTO} from '../modal/dto/IBillChargingDTO';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private getAllTableAPI = 'http://localhost:8080/api/private/sales';
  private getBillDetailAPI = 'http://localhost:8080/api/private/sales/bill/';
  private getBillChargingAPI = 'http://localhost:8080/api/private/sales/bill-charging/';
  private billChargingAPI = 'http://localhost:8080/api/private/sales/bill-charge/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ITable[]> {
    return this.httpClient.get<ITable[]>(this.getAllTableAPI);
  }

  getBillDetailByTableId(tableId: number): Observable<IBillDetailListDTO[]> {
    return this.httpClient.get<IBillDetailListDTO[]>(this.getBillDetailAPI + tableId);
  }

  getBillChargingByTableId(tableId: number): Observable<IBillChargingDTO[]> {
    return this.httpClient.get<IBillChargingDTO[]>(this.getBillChargingAPI + tableId);
  }

  tinhTien(tableId) {
    const url = this.billChargingAPI + tableId;
    console.log(url);
    return this.httpClient.get<IBillChargingDTO[]>(url);
  }
}
