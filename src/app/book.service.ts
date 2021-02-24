import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookResponse } from './model/BookResponse';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  constructor(private http: HttpClient) {}

  getBooks(): Observable<BookResponse> {
    return this.http
      .get<BookResponse>('http://localhost:8080/api/books', this.httpOptions)
      .pipe(
        tap(() => this.log('fetched books: ')),
        catchError(this.handleError<BookResponse>('getBooks'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
