import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { Action } from 'src/app/screen/create-edit-book/create-edit-book.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit {
  data: Book[] = [];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.bookService.getBooks('', 0, 0).subscribe((res) => {
      console.log(res);
      this.data = (res as any).body;
      this.dtTrigger.next();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  editBook(id: number) {
    this.router.navigate(['edit'], {
      queryParams: {
        action: Action.Edit,
        id: id
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    })
  }

  deleteBook(index: number, id: number) {
    this.bookService.deleteBook(id).subscribe(
      (res) => {
        this.data.splice(index, 1);
      },
      (err) => { },
      () => { }
    );
    console.log('deleteBook');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
