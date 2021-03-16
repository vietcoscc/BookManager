import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from 'src/app/app.component';
import { finalize, isEmpty } from 'rxjs/operators';
import { Action } from 'src/app/enum';
import { MatButton } from '@angular/material/button';
import { SearchService } from 'src/app/service/search.service';
import { DialogService } from 'src/app/service/dialog.service';
import { DialogType } from 'src/app/model/enum/DialogType';
import { DialogData } from 'src/app/model/DialogData';

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
    private cdref: ChangeDetectorRef,
    private searchService: SearchService,
    private dialogService: DialogService,
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.searchService.currentMessage.subscribe(inputSearch => {
      console.log(inputSearch);
      this.bookService.getBooks(inputSearch, 0, 0).subscribe(
        res => {
          this.data.data = []
          this.data.data = (res as any).body
          this.data._updateChangeSubscription()
        })
    })
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

  imageThumbnailUrl(element: Book) {
    if (element.imageUrl) {
      return AppComponent.baseUrl + 'images/thumb_' + element.imageUrl;
    } else {
      return AppComponent.defaultBookCover;
    }
  }

  onViewImageDetail(element: Book) {
    console.log("onViewImageDetail: " + this.imageUrl(element));
    this.dialogService.openDialog({
      type: DialogType.ImageDetail,
      data: this.imageUrl(element)
    })
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

  deleteBook(index: number, id: number, btnDelete: HTMLButtonElement) {
    this.dialogService.openDialog(new DialogData('Are you sure to delete?', DialogType.Confirms)).subscribe(result => {
      console.log(result);
      if (result) {
        btnDelete.disabled = true
        this.bookService.deleteBook(id).pipe(finalize(() => {
          btnDelete.disabled = false
        })).subscribe(
          (res) => {
            this.data.data.splice(index, 1);
            this.data._updateChangeSubscription();
          },
          (err) => { },
          () => { },

        );
      }
    })
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


    }
  }

  disableBtn(isDisabled: boolean,) {
    // this.btnDelete.nativeElement.disabled = isDisabled
    // this.btnEdit.nativeElement.disabled = isDisabled
  }

  ngOnDestroy(): void { }
}
