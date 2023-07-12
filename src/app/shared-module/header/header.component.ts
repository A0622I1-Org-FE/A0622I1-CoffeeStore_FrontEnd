import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import {ShareService} from '../../service/share.service';
import {Router, RouterModule} from '@angular/router';
import {LoginStatusService} from '../../service/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/style.css',
    '../../../assets/css/style.css',
    '../../../assets/scss/style.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  name: string;
  role: string;

  constructor(private tokenStrorageService: TokenStorageService,
              private loginStatus: LoginStatusService,
              private shareService: ShareService,
              private router: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStrorageService.getToken()) {
      this.name = this.tokenStrorageService.getName();
      this.role = this.tokenStrorageService.getRole()[0];
      this.loginStatus.changeStatus(true);
      this.loginStatus.currentStatus.subscribe(login => this.isLoggedIn = login);
      // this.isLoggedIn = true;
      // isLoggedIn = this.name != null;
    }

    console.log(this.role);
  }

  logout(): void {
    this.tokenStrorageService.signOut();
    this.loginStatus.changeStatus(false);
    this.loginStatus.currentStatus.subscribe(login => this.isLoggedIn = login);
    this.router.navigateByUrl('');
  }

  createStatus(status) {
    this.loginStatus.changeStatus(status);
  }
}
