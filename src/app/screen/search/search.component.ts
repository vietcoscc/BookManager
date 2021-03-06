import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  id: number | null = null
  name: string = ''
  description: string = ''
  author: string = ''
  data = new MatTableDataSource<Book>()
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.onSearch()
  }

  onSubmit() {
    console.log("submit");
  }

  onSearch() {
    this.bookService.searchBook(this.id, this.name, this.description, this.author).subscribe(
      res => {
        console.log(res);
        this.data.data = (res as any).body
      },
      err => { }
    )
  }
}
