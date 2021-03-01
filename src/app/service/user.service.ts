import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/LoginRequest';
import { BaseResponse } from '../model/BaseResponse';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  /** POST: add a new hero to the server */
  login(user: LoginRequest): Observable<BaseResponse<string>> {
    let httpOptions = {};
    return this.http
      .post<BaseResponse<string>>(
        'http://localhost:8080/api/login',
        user,
        httpOptions
      )
      .pipe(
        tap((_) => this.log('Login success'))
      );
  }
}
