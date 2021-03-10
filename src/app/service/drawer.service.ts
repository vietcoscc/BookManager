import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public isOpenedDrawer: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() { }
}
