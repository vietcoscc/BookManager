import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
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

    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        alert(err);
        return throwError(err);
      }),
      finalize(() => {
        console.log("finalize");
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
