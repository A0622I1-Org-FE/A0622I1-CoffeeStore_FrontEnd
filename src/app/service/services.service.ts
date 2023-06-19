import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServices} from '../modal/IServices';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private bestSellerApi = 'http://localhost:8080/api/service/body/best';

  private newFoodApi = 'http://localhost:8080/api/service/body/new';

  constructor(private httpClient: HttpClient) {
  }

  getListBestSeller(): Observable<IServices[]> {
    return this.httpClient.get<IServices[]>(this.bestSellerApi);
  }

  getListNewFood(): Observable<IServices[]> {
    return this.httpClient.get<IServices[]>(this.newFoodApi);
  }
}
