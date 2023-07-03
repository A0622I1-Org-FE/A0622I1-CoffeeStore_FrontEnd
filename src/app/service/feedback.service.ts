/**
 * FeedbackService class to create shared methods, get data from API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FeedbackResponse} from '../modal/FeedbackResponse';
import {FeedbackDetail} from '../modal/FeedbackDetail';
import {FeedbackDto} from '../dto/feedback-dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API_URL = 'http://localhost:8080/api/listFeedback';
  private API_URL_FEEDBACKDETAIL = 'http://localhost:8080/api/feedbackDetail';
  private API_URL_FEEDBACKIMG = 'http://localhost:8080/api/feedbackImg';
  private API_URL_SEARCHDATE = 'http://localhost:8080/api/getListByRateDate';
  private API_URL_CREATE = 'http://localhost:8080/api/feedback/create';
  private API_EMAIL = 'http://localhost:8080/api/feedback/count';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page: number, pageSize: number): Observable<FeedbackResponse> {
    const url = `${this.API_URL}?page=${page}&size=${pageSize}`;
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
    return this.httpClient.post<FeedbackDto>(this.API_URL_CREATE, feedback);
  }

  countEmail(email: string): Observable<number> {
    return this.httpClient.get<number>(`${this.API_EMAIL}/${email}`);
  }
}
