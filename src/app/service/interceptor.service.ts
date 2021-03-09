import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { LoaderService } from './loader.service';
import { AuthInfo, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService extends BaseService implements HttpInterceptor {
  constructor(public loaderService: LoaderService, private localStorage: LocalStorageService) {
    super();
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept');
    if (!req.url.startsWith(AppComponent.awsDoMainPrefix)) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem(AuthInfo.tokenType) + ' ' + localStorage.getItem(AuthInfo.accessToken)
        }
      })
    }
    console.log(req);

    setTimeout(() => {
      this.loaderService.isLoading.next(true);
    }, 1)
    return next.handle(req).pipe(
      tap((type) => {
        console.log(type);
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('catchError');
        return throwError(err);
      }),
      finalize(() => {
        console.log('finalize');
        setTimeout(() => {
          this.loaderService.isLoading.next(false);
        }, 500)
      })
    );
  }
}
