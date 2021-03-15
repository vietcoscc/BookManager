import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { BaseResponse } from '../model/BaseResponse';
import { BaseService } from './base.service';

import { Book } from '../model/Book';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  baseBookUrl = AppComponent.baseUrl + 'api/books';
  getBook(id: string | number): Observable<BaseResponse<Book>> {
    let httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams(),
    };

    return this.http
      .get<BaseResponse<Book>>(this.baseBookUrl + '/' + id, httpOptions)
      .pipe(
        tap(() => this.log('fetched books: ')),
        catchError(this.handleError<BaseResponse<Book>>('getBooks'))
      );
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
      .get<BaseResponse<Array<Book>>>(this.baseBookUrl, httpOptions)
      .pipe(
        tap(() => this.log('fetched books: ')),
        catchError(this.handleError<BaseResponse<Array<Book>>>('getBooks'))
      );
  }

  saveBook(book: Book, file: File | null) {
    //dont touch book ref for display img
    let copyBook = JSON.parse(JSON.stringify(book))

    let httpOptions = {};
    let form = new FormData();
    copyBook.imageUrl = '';
    form.append('book', JSON.stringify(copyBook));
    if (file != null) {
      form.append('image', file);
    }
    return this.http
      .post<BaseResponse<string>>(this.baseBookUrl, form, httpOptions)
      .pipe(tap((_) => this.log('saved book')));
  }

  putBook(book: Book, hasUrlImg: boolean, file: File | null): Observable<BaseResponse<Book>> {
    //dont touch book ref for display img
    let copyBook = JSON.parse(JSON.stringify(book))

    let httpOptions = {};
    let form = new FormData();
    if (!hasUrlImg) {
      copyBook.imageUrl = '';
    }
    form.append('book', JSON.stringify(copyBook));
    if (file != null) {
      form.append('image', file);
    }
    return this.http
      .put<BaseResponse<Book>>(this.baseBookUrl + '/' + copyBook.id, form)
      .pipe(
        tap(() => {
          console.log('updated book');
        })
      );
  }

  deleteBook(id: number): Observable<BaseResponse<string>> {
    let url = this.baseBookUrl + "/" + id;
    return this.http.delete<BaseResponse<string>>(url).pipe(
      tap(() => this.log('deleted book: ')),
      catchError(this.handleError<BaseResponse<string>>('delete book'))
    );
  }

  searchBook(id: number | null, name: string = '', description: string = '', author: string = '', page: string = '', limit: string = '') {
    let httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
        .set('id', id ? id.toString() : '')
        .set('name', name)
        .set('description', description)
        .set('author', author)
        .set('page', page)
        .set('limit', limit),
    };

    return this.http
      .get<BaseResponse<Array<Book>>>(this.baseBookUrl + "/search", httpOptions)
      .pipe(
        tap(() => this.log('fetched books: ')),
        catchError(this.handleError<BaseResponse<Array<Book>>>('getBooks'))
      );
  }
}
