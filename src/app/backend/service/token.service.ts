/* import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataUser } from 'src/app/interface/dataUser';

const tokenKey = 'authToken';
const usernameKey = 'authUsername';
const authoritiesKey = 'authAuthorities';
const user = 'userFromDataBase';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  rols: string[] = [];
  private isLogged$: Subject<boolean> = new Subject();
  private edithMode$: Subject<boolean> = new Subject();

  constructor() {}

  public loggedObservable(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
  public changeObservable(status: boolean): void {
    this.isLogged$.next(status);
  }
  public edithObservable(): Observable<boolean> {
    return this.edithMode$.asObservable();
  }
  public changeEdithObservable(status: boolean): void {
    this.edithMode$.next(status);
  }

  public getUser(): DataUser {
    return JSON.parse(sessionStorage.getItem(user) || '');
  }
  public setUser(userDB: DataUser): void {
    window.sessionStorage.removeItem(user);
    window.sessionStorage.setItem(user, JSON.stringify(userDB));
  }
  public getExistUser(): boolean {
    return JSON.parse(window.sessionStorage.getItem(exist) || '');
  }
  public setExistUser(b: boolean) {
    window.sessionStorage.setItem(exist, JSON.stringify(b));
  }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(tokenKey)!;
  }
  public setUsername(username: string): void {
    window.sessionStorage.removeItem(usernameKey);
    window.sessionStorage.setItem(usernameKey, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(usernameKey) || '';
  }
  public setAuthorities(authorities: string): void {
    window.sessionStorage.removeItem(authoritiesKey);
    window.sessionStorage.setItem(authoritiesKey, JSON.stringify(authorities));
  }
  public getAuthorities(): string {
    return JSON.parse(window.sessionStorage.getItem(authoritiesKey) || '');
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
 */
