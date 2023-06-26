import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServices} from '../modal/IServices';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

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
}
