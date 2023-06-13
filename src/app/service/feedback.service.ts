import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FeedbackResponse} from '../modal/FeedbackResponse';
import {FeedbackDetail} from '../modal/FeedbackDetail';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API_URL = 'http://localhost:8080/api/listFeedback';
  private API_URL_FEEDBACKDETAIL = 'http://localhost:8080/api/feedbackDetail';
  private API_URL_FEEDBACKIMG = 'http://localhost:8080/api/feedbackImg';
  private API_URL_SEARCHDATE = 'http://localhost:8080/api/getListByDate';

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

  searchDate(date: string, page: number, pageSize: number) {
    const url = `${this.API_URL_SEARCHDATE}?page=${page}&size=${pageSize}&date=${date}`;
    return this.httpClient.get<FeedbackResponse>(url);
  }
}
