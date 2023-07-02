import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import {ShareService} from '../../service/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/style.css',
    '../../../assets/css/style.css',
    '../../../assets/scss/style.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  role: string;

  constructor(private tokenStrorageService: TokenStorageService,
              private shareService: ShareService) {
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
      this.isLoggedIn = true;
      console.log(this.name);
      console.log( this.role);
      console.log( this.isLoggedIn);
      // isLoggedIn = this.name != null;
    }
  }

  logout(): void {
    this.tokenStrorageService.signOut();
    this.ngOnInit();
  }
}
