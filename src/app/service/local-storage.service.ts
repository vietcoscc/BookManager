import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Oauth2Token } from '../model/Oauth2Token';

enum AuthInfo {
  authorizationCode = 'authorizationCode',
  idToken = 'idToken',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  expiresIn = 'expiresIn',
  tokenType = 'tokenType',
  login = 'login',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public setItemObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }

  public setLoggedIn(token: Oauth2Token | null = null) {
    localStorage.setItem(AuthInfo.login, 'logged')
    if (token) {
      localStorage.setItem(AuthInfo.idToken, token.id_token)
      localStorage.setItem(AuthInfo.accessToken, token.access_token)
      localStorage.setItem(AuthInfo.refreshToken, token.refresh_token)
      localStorage.setItem(AuthInfo.expiresIn, token.expires_in.toString())
      localStorage.setItem(AuthInfo.tokenType, token.token_type)
    }
  }

  public setLoggedOut() {
    localStorage.removeItem(AuthInfo.login)
    localStorage.removeItem(AuthInfo.idToken)
    localStorage.removeItem(AuthInfo.accessToken)
    localStorage.removeItem(AuthInfo.refreshToken)
    localStorage.removeItem(AuthInfo.expiresIn)
    localStorage.removeItem(AuthInfo.tokenType)
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(AuthInfo.login) == 'logged'
      && localStorage.getItem(AuthInfo.idToken) != null
      && localStorage.getItem(AuthInfo.accessToken) != null
      && localStorage.getItem(AuthInfo.refreshToken) != null
  }
}
