import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit {
  @Input('data') data: Book[] = Array();

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'description',
    'author',
  ];
  constructor() {}

  ngOnInit(): void {}
}
