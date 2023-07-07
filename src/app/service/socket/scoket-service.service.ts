import {Injectable} from '@angular/core';
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ToastrService} from 'ngx-toastr';
import {Message} from '../../modal/message';
import {ServicesService} from '../services.service';


@Injectable({
  providedIn: 'root'
})
export class ScoketServiceService {
  stompClient: any;
  messList: Message[] = [];

  constructor(private service: ServicesService,
              private toastrService: ToastrService) {
  }

  get mess() {
    return this.messList;
  }

  connect() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/messages', data => {
        // this.toastrService.success(JSON.stringify(data));
        const mess1 = JSON.parse(data.body);
        this.messList.push(mess1);
        // this.toastrService.success(mess);
      });
    });
  }

  connectTable() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/tables', data => {
        // this.toastrService.success(JSON.stringify(data));
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

  updateTable(idTable: number) {
    this.stompClient.send('/app/tables', {}, JSON.stringify(idTable));
  }
}
