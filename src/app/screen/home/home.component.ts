import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { Book } from 'src/app/model/Book';
import { AuthService } from 'src/app/service/auth.service';
import { Action } from '../create-edit-book/create-edit-book.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  constructor(
    private cdref: ChangeDetectorRef,
    public authService: AuthService,
    private router: Router
  ) {
    console.log(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    this.cdref.detectChanges();
  }

  createBook() {
    this.router.navigate(['create'], {
      queryParams: {
        action: Action.Create,
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false,
      // do not trigger navigation
    });
  }
}
