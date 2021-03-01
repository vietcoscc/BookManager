import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public static baseUrl = 'http://localhost:8080/';
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  title = 'BookManager';
  constructor(private router: Router, public loaderService: LoaderService) {
    console.log(loaderService.isLoading.value);
  }
  ngOnInit(): void {}
}
