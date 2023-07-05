import {IServices} from '../modal/IServices';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceRespone} from '../modal/ServiceRespone';
import {Message} from '../modal/message';
import {ITable} from '../modal/ITable';

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
