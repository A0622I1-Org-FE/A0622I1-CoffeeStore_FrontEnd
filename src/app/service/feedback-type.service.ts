import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeedbackTypeDto} from '../dto/feedback-type-dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackTypeService {
  private API_URL = 'http://localhost:8080/type/list';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<FeedbackTypeDto[]> {
    return this.httpClient.get<FeedbackTypeDto[]>(this.API_URL);
  }
}
