import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit {
  data: Book[] = [];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private bookService: BookService) {}

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

  editBook(index: number) {
    console.log('editBook');
  }

  deleteBook(index: number, id: number) {
    this.bookService.deleteBook(id).subscribe(
      (res) => {
        this.data.splice(index, 1);
      },
      (err) => {},
      () => {}
    );
    console.log('deleteBook');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
