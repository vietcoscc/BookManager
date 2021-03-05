import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModalComponent } from './component/alert-modal/alert-modal.component';
import { BookTableComponent } from './component/book-table/book-table.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { CreateEditBookComponent } from './screen/create-edit-book/create-edit-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressComponent } from './component/progress/progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './service/interceptor.service';
import { LoaderService } from './service/loader.service';
import { LocalStorageService } from './service/local-storage.service';
import { PageNotFoundComponent } from './screen/page-not-found/page-not-found.component';
import { SearchComponent } from './screen/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    AlertModalComponent,
    BookTableComponent,
    routingComponents,
    CreateEditBookComponent,
    ProgressComponent,
    PageNotFoundComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoaderService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
