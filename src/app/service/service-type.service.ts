import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServiceType} from '../modal/IServiceType';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  private API_URL = 'http://localhost:8080/api/private/list/service_type';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<IServiceType[]> {
    return this.httpClient.get<IServiceType[]>(this.API_URL);
  }
}
