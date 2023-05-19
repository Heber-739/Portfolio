import { Injectable } from '@angular/core';

const USERNAME = 'authUsername';

@Injectable({
  providedIn: 'root',
})
export class CRUDLocalService {
  public getAll(key: string): any {
    return JSON.parse(window.sessionStorage.getItem(key) || '[]');
  }
  public setAll<T>(arrayT: T[], key: string): void {
    window.sessionStorage.setItem(key, JSON.stringify(arrayT));
  }

  public get<T>(key: string): T[] {
    return JSON.parse(window.sessionStorage.getItem(key) || '[]');
  }
  public set<T>(arrayT: T | T[], key: string): void {
    window.sessionStorage.setItem(key, JSON.stringify(arrayT));
  }

  public add<T>(element: T, key: string): void {
    let arr: T[] = this.get(key);
    arr.push(element);
    this.set(arr, key);
  }
  public remove<T>(el: T, key: string): void {
    let arr = this.get(key).filter((i) => i != el);
    this.set(arr, key);
  }
  public update<T>(el: T, key: string) {
    let arr: T[] = this.get<T>(key);
    let i: number = arr.findIndex((e) => e == el);
    arr[i] = el;
    this.set(arr, key);
  }

  /* ----- User ----- */
  public setUsername(username: string) {
    this.set(username, USERNAME);
  }

  public getUsername() {
    return this.get(USERNAME);
  }
}
