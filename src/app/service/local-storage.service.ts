import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string){
    return localStorage.getItem(key)
  }
  public removeItem(key:string) {
    localStorage.removeItem(key);
  }
  public clear(){
    localStorage.clear();
  }

  public setLoggedIn(){
    localStorage.setItem('login','logged')
  }

  public setLoggedOut(){
    localStorage.removeItem('login')
  }

  public isLoggedIn(){
    return localStorage.getItem('login') == 'logged'
  }
}
