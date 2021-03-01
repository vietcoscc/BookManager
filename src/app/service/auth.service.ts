import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLogedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public jwt: string | null = null;

  constructor() {}
}
