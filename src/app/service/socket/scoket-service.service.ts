import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {Message} from '../../modal/message';
import {Observable} from 'rxjs';
import {ServicesService} from '../services.service';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ScoketServiceService {
  stompClient: any;
  messList: Message[] = [];

  constructor(private service: ServicesService,
              private toastrService: ToastrService) {
  }

  connect() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      console.log(frame);
      this.stompClient.subscribe('/topic/messages', data => {
        // this.toastrService.success(JSON.stringify(data));
        const mess1 = JSON.parse(data.body);
        this.messList.push(mess1);
        // this.toastrService.success(mess);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
  getAllMess() {
    this.service.getMessage().subscribe(data => {
      this.messList = data;
    });
  }
  sendMessage(message: string) {
    this.stompClient.send('/app/messages', {}, JSON.stringify(message));
  }
  get mess() {
    return this.messList;
  }
}
