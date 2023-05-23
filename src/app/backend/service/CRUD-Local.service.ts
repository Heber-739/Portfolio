import { Injectable } from '@angular/core';

const DATA: { [key: string]: string } = {
  username: 'authUsername',
  token: 'authToken',
  authorities: 'authAuthorities',
  user: 'userFromDataBase',
  exist: 'UserExistDB',
  animation: 'animation',
};

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

  public get<T>(key: string): T {
    return JSON.parse(window.sessionStorage.getItem(key) || 'null');
  }
  public set<T>(arrayT: T | T[], key: string): void {
    window.sessionStorage.setItem(key, JSON.stringify(arrayT));
  }

  public add<T>(element: T, key: string): void {
    let arr: T[] = this.get(key) ?? [];
    arr.push(element);
    this.set(arr, key);
  }
  public remove<T>(el: T, key: string): void {
    let arr: T[] = this.get(key) ?? [];
    this.set(
      arr.filter((i) => i != el),
      key
    );
  }
  public update<T>(el: T, key: string) {
    let arr: T[] = this.get(key);
    let i: number = arr.findIndex((e) => e == el);
    arr[i] = el;
    this.set(arr, key);
  }

  /* ----- User ----- */
  public setUserData<T>(obj: T, key: string) {
    this.set(obj, DATA[key]);
  }

  public getUserData<T>(key: string) {
    return this.get<T>(DATA[key]);
  }
}
