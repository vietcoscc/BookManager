import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private inputSearch = new BehaviorSubject<string>('');
  public currentMessage = this.inputSearch.asObservable();

  constructor() { }

  onSearch(name: string) {
    this.inputSearch.next(name)
  }
}
