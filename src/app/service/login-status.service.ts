import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  currentStatus = this.loginStatus.asObservable();

  constructor() {
  }

  changeStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}
