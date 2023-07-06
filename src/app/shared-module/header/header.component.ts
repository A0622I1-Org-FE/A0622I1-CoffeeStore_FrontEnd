import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/style.css',
    '../../../assets/css/style.css',
    '../../../assets/scss/style.scss']
})
export class HeaderComponent implements OnInit {
  private loggedIn = false;
  avatarUrl = '../../../assets/img/tải xuống.png';
  showDropdown = false;

  constructor() {
  }

  ngOnInit(): void {
    this.avatarUrl;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      sessionStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    sessionStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
