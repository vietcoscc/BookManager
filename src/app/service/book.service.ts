import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseResponse } from '../model/BaseResponse';
import { BaseService } from './base.service';

import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getBooks(
    search: string = '',
    page: number = 0,
    limit: number = 5
  ): Observable<BaseResponse<Array<Book>>> {
    let httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
        .set('search', search)
        .set('page', page.toString())
        .set('limit', limit.toString()),
    };

    return this.http
      .get<BaseResponse<Array<Book>>>(
        'http://localhost:8080/api/books',
        httpOptions
      )
      .pipe(
        tap(() => this.log('fetched books: ')),
        catchError(this.handleError<BaseResponse<Array<Book>>>('getBooks'))
      );
  }

  saveBook(book: Book, file = null) {
    console.log(file);

    let httpOptions = {};
    let form = new FormData();
    form.append('book', JSON.stringify(book));
    if (file != null) {
      form.append('image', file! as File);
    }
    return this.http
      .post<BaseResponse<string>>(
        'http://localhost:8080/api/books',
        form,
        httpOptions
      )
      .pipe(tap((_) => this.log('saved book')));
  }

  deleteBook(id: number): Observable<BaseResponse<string>> {
    let url = 'http://localhost:8080/api/books/' + id;
    return this.http.delete<BaseResponse<string>>(url).pipe(
      tap(() => this.log('deleted book: ')),
      catchError(this.handleError<BaseResponse<string>>('delete book'))
    );
  }
}
