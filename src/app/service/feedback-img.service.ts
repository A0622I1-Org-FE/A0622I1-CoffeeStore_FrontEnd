import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeedbackImageDto} from '../dto/feedback-image-dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackImgService {
  API_URL = 'http://localhost:8080/image/create';

  constructor(private httpClient: HttpClient) {
  }

  save(feedbackImage: FeedbackImageDto): Observable<FeedbackImageDto> {
    return this.httpClient.post<FeedbackImageDto>(this.API_URL, feedbackImage);
  }
}
