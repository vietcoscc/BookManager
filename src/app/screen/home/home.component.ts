import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private bookService: BookService) {
    this.bookService.getBooks().subscribe((res) => {
      console.log(res.message);
      alert(res.body[0].name);
    });
  }

  ngOnInit(): void {}
}
