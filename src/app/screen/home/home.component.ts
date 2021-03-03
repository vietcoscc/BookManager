import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { Action } from 'src/app/enum';
import { Book } from 'src/app/model/Book';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  data = new MatTableDataSource<Book>()
  constructor(
    private cdref: ChangeDetectorRef,
    public authService: AuthService,
    private router: Router,
    private bookService: BookService
  ) {
    console.log(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    this.cdref.detectChanges();
    this.bookService.getBooks('', 0, 0).subscribe((res) => {
      console.log(res);
      this.data.data = (res as any).body;
    });
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


  advancedSearch() {
    console.log("advancedSearch");

    this.router.navigate(['search'])
  }

}
