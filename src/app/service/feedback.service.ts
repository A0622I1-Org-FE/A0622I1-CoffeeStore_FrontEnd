import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeedbackDto} from '../../dto/feedback-dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  API_URL = 'http://localhost:8080/feedback/create';

  constructor(private httpClient: HttpClient) {
  }

  save(feedback: FeedbackDto): Observable<FeedbackDto> {
    return this.httpClient.post<FeedbackDto>(this.API_URL, feedback);
  }
}
