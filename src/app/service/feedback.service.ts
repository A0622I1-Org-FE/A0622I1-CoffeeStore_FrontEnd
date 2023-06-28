import {FeedbackDto} from '../dto/feedback-dto';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FeedbackResponse} from '../modal/FeedbackResponse';
import {FeedbackDetail} from '../modal/FeedbackDetail';

/**
 * FeedbackService class to create shared methods, get data from API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  API_URL = 'http://localhost:8080/feedback/create';
  private API_URL_LIST = 'http://localhost:8080/api/listFeedback';
  private API_URL_FEEDBACKDETAIL = 'http://localhost:8080/api/feedbackDetail';
  private API_URL_FEEDBACKIMG = 'http://localhost:8080/api/feedbackImg';
  private API_URL_SEARCHDATE = 'http://localhost:8080/api/getListByRateDate';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page: number, pageSize: number): Observable<FeedbackResponse> {
    const url = `${this.API_URL_LIST}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<FeedbackResponse>(url);
  }

  findById(id: number): Observable<FeedbackDetail> {
    return this.httpClient.get<FeedbackDetail>(`${this.API_URL_FEEDBACKDETAIL}/${id}`);
  }

  findImgUrlById(id: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API_URL_FEEDBACKIMG}/${id}`);
  }

  searchRateDate(rate: string, dateF: string, dateT: string, page: number, pageSize: number): Observable<FeedbackResponse> {
    const url = `${this.API_URL_SEARCHDATE}?page=${page}&size=${pageSize}&rate=${rate}&dateF=${dateF}&dateT=${dateT}`;

    return this.httpClient.get<FeedbackResponse>(url);
  }

  save(feedback: FeedbackDto): Observable<FeedbackDto> {
    return this.httpClient.post<FeedbackDto>(this.API_URL, feedback);
  }
}
