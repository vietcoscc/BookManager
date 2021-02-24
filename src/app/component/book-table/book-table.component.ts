import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  description: string;
  author: string;
  image: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hat Giong Tam Hon',
    description: '',
    author: 'H',
    image: 'https://image.flaticon.com/icons/png/128/926/926358.png',
  },
  {
    position: 2,
    name: 'Hat Giong Tam Hon',
    description: '',
    author: 'H',
    image: 'https://image.flaticon.com/icons/png/128/926/926358.png',
  },
  {
    position: 3,
    name: 'Hat Giong Tam Hon',
    description: '',
    author: 'H',
    image: 'https://image.flaticon.com/icons/png/128/926/926358.png',
  },
  {
    position: 4,
    name: 'Hat Giong Tam Hon',
    description: '',
    author: 'H',
    image: 'https://image.flaticon.com/icons/png/128/926/926358.png',
  },
];

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
})
export class BookTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'image',
    'name',
    'description',
    'author',
  ];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {}
}
