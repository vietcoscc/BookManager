import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  constructor() {

  }

  ngOnInit(): void {}
}
