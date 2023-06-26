import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private loggedIn = false;
  constructor() { }

  ngOnInit(): void {
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
}
