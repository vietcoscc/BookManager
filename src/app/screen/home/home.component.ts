import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  tableData: Book[] = Array();
  constructor(private bookService: BookService) {
    this.bookService.getBooks('58', 0, 5).subscribe((res) => {
      console.log(res);
      this.tableData = res.body as Book[];
    });
  }

  ngOnInit(): void {}
}
