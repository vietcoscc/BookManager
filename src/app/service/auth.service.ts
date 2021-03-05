import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Oauth2Token } from '../model/Oauth2Token';
import { Oauth2TokenRequest } from '../model/Oauth2TokenRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getOauth2Token(authorizationCode: string): Observable<Oauth2Token> {
    let form = new FormData()
    form.append('grant_type', AppComponent.grantType)
    form.append('client_id', AppComponent.clientId)
    form.append('code', authorizationCode)
    form.append('redirect_uri', AppComponent.redirectUri)

    let data = 'grant_type=authorization_code&client_id='
      + AppComponent.clientId
      + '&code=' + authorizationCode
      + '&redirect_uri=' + AppComponent.redirectUri
    let authorization = btoa(AppComponent.clientId + ':' + AppComponent.clientSecret)
    let options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + authorization)
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<Oauth2Token>(AppComponent.doMainPrefix + '/oauth2/token', data, options)
  }
}
