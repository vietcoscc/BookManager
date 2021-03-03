import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from 'src/app/app.component';
import { isEmpty } from 'rxjs/operators';
import { Action } from 'src/app/enum';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit {

  @Input('data') data = new MatTableDataSource<Book>();

  dtOptions: DataTables.Settings = {};
  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'description',
    'author',
    'action',
  ];
  constructor(
    private bookService: BookService,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  searchString: string = ''

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  get isTableEmpty() {
    return this.data.data.length == 0
  }

  get isOnAdvancedSearch() {
    return this.router.url.startsWith("/search")
  }

  imageUrl(element: Book) {
    if (element.imageUrl) {
      return AppComponent.baseUrl + 'images/' + element.imageUrl;
    } else {
      return AppComponent.defaultBookCover;
    }
  }

  editBook(id: number | null) {
    if (id == null) {
      return;
    }
    this.router.navigate(['edit'], {
      queryParams: {
        action: Action.Edit,
        id: id,
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false,
      // do not trigger navigation
    });
  }

  deleteBook(index: number, id: number) {
    console.log(index);
    this.bookService.deleteBook(id).subscribe(
      (res) => {
        this.data.data.splice(index, 1);
        this.data._updateChangeSubscription();
      },
      (err) => { },
      () => { }
    );
    console.log('deleteBook');
  }

  deleteRowData(row: Book) {
    this.data.data.filter((value, key) => {
      return value.id != row.id;
    });
  }

  keyEvent(event: KeyboardEvent) {
    console.log(event);
    console.log(this.searchString);

    if (event.key == "Enter") {
      this.bookService.getBooks(this.searchString, 0, 0).subscribe(
        res => {
          this.data.data = []
          this.data.data = (res as any).body
          this.data._updateChangeSubscription()
        })

    }
  }
  ngOnDestroy(): void { }
}
