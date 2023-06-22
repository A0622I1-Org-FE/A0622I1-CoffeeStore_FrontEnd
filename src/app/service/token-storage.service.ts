import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const NAME_KEY = 'auth-name';
const ROLE_KEY = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public saveTokenLocal(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    if (window.localStorage.getItem(TOKEN_KEY) !== null) {
      return window.localStorage.getItem(TOKEN_KEY);
    }
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRoleLocal(roles: string[]) {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public saveRoleSession(roles: string[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRole(): string[] {
    if (window.localStorage.getItem(ROLE_KEY) !== null) {
      return JSON.parse(window.localStorage.getItem(ROLE_KEY));
    }
    return JSON.parse(window.sessionStorage.getItem(ROLE_KEY));
  }

  public saveNameLocal(name: string) {
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, JSON.stringify(name));
  }

  public saveNameSession(name: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, JSON.stringify(name));
  }

  public getName(): string {
    if (window.localStorage.getItem(NAME_KEY) !== null) {
      return window.localStorage.getItem(NAME_KEY);
    }
    return window.sessionStorage.getItem(NAME_KEY);
  }

  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  constructor() {
  }
}
