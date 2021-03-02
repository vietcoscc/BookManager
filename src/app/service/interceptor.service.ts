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
import { BaseService } from './base.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService extends BaseService implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {
    super();
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.loaderService.isLoading.next(true);
    }, 1)
    return next.handle(req).pipe(
      tap((res) => {
        console.log(res);

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
