import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IServices} from '../modal/IServices';
import {ServiceRespone} from '../modal/ServiceRespone';
import {Message} from '../modal/message';
import {ITable} from '../modal/ITable';
import {ServiceRespone1} from '../modal/ServiceRespone1';
import {IServiceDto1} from '../modal/IServiceDto1';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private idTable: number;
  private change = 'false';
  private API_URL = 'http://localhost:8080/api/private/list/service';
  private API_URL_TYPE = 'http://localhost:8080/api/private/type_id';
  private API_URL_SERVICE = 'http://localhost:8080/api/private/list/service_type';
  private API_URL_BEST_SELLER = 'http://localhost:8080/api/public/body/best';
  private API_URL_NEW_FOOD = 'http://localhost:8080/api/public/body/new';
  private API_URL_TABLE = 'http://localhost:8080/api/private/list/table';
  private API_URL_LIST_SERVICE = 'http://localhost:8080/api/private/list/listService';
  private API_URL_CREATE_SERVICE = 'http://localhost:8080/api/private/list/createService';
  private API_URL_UPDATE_ENABLE_FLAG = 'http://localhost:8080/api/private/list/serviceList/changeServiceEnableFlag';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private httpClient: HttpClient) {
  }

  updateFlag(flag, id, service): Observable<IServiceDto1> {
    const url = `${this.API_URL_UPDATE_ENABLE_FLAG}?flag=${flag}&id=${id}`;
    return this.httpClient.put<IServiceDto1>(url, service, this.httpOptions);
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

  findAllListService(page: number, pageSize: number,
                     serviceName: string, serviceType: string,
                     createdDateF: string, createdDateT: string,
                     priceF: string, priceT: string,
                     quantityF: string, quantityT: string, enableFlag: string,
                     paymentF: string, paymentT: string, paymentTimeF: string, paymentTimeT: string): Observable<ServiceRespone1> {
    const url = this.API_URL_LIST_SERVICE +
      '?page=' + page + '&size=' + pageSize + '&serviceName=' + serviceName + '&serviceType=' + serviceType +
      '&createdDateF=' + createdDateF + '&createdDateT=' + createdDateT + '&priceF=' + priceF +
      '&priceT=' + priceT + '&quantityF=' + quantityF + '&quantityT=' + quantityT + '&enableFlag=' + enableFlag +
      '&paymentF=' + paymentF + '&paymentT=' + paymentT + '&paymentTimeF=' + paymentTimeF + '&paymentTimeT=' + paymentTimeT;
    return this.httpClient.get<ServiceRespone1>(url);
  }

  createService(service): Observable<IServices> {
        return this.httpClient.post<IServices>(this.API_URL_CREATE_SERVICE, JSON.stringify(service), this.httpOptions)
          .pipe(
            catchError(this.errorHandler)
          );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  findAllTable(): Observable<ITable[]> {
    return this.httpClient.get<ITable[]>(this.API_URL_TABLE);
  }

  searchTypeId(id: number, page: number, pageSize: number): Observable<ServiceRespone> {
    const url = `${this.API_URL_TYPE}?id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<ServiceRespone>(url);
  }

  serviceById(id: number): Observable<IServices> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<IServices>(url);
  }

  getMessage(): Observable<Message[]> {
    return this.httpClient.get<Message[]>('http://localhost:8080/api/private/message');
  }

  deleteMessage(id: number): Observable<Message> {
    return this.httpClient.delete<Message>('http://localhost:8080/api/private/delete_message/' + id);
  }

  setIdTable(id: number) {
    this.idTable = id;
  }

  getIdTable() {
    return this.idTable;
  }

  setChange(status: string) {
    this.change = status;
  }

  getChange() {
    return this.change;
  }

}
