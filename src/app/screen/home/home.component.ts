import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { Action } from 'src/app/enum';
import { Book } from 'src/app/model/Book';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  data = new MatTableDataSource<Book>()

  public get isLoggedIn(): boolean {
    return this.localStorage.isLoggedIn()
  }

  constructor(
    private router: Router,
    private bookService: BookService,
    public localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,

  ) {
    console.log(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    this.checkLogin()
    this.initData()
  }

  checkLogin() {
    console.log('checkLogin');

    let authorizationCode = this.activatedRoute.snapshot.queryParamMap.get('code')!
    console.log('authorizationCode: ' + authorizationCode);

    if (!this.localStorage.isLoggedIn() && authorizationCode) {
      console.log('!this.localStorage.isLoggedIn() && authorizationCode');

      this.localStorage.setLoggedIn()
      this.authService.getOauth2Token(authorizationCode).subscribe(
        res => {
          console.log(res);
          this.localStorage.setLoggedIn(res)
        },
        err => {
          console.log(err);
          this.localStorage.setLoggedOut()
          AppComponent.redirectToSignInHostedUI()
        }
      )
    }
  }

  initData() {
    this.bookService.getBooks('', 0, 0).subscribe((res) => {
      console.log(res);
      this.data.data = (res as any).body;
    });
  }

  createBook() {
    console.log('createBook');

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


  advancedSearch() {
    console.log("advancedSearch");

    this.router.navigate(['search'])
  }

}
