import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarComponent } from './../../component/tool-bar/tool-bar.component';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  ViewChildren,
} from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { AppComponent } from 'src/app/app.component';
import { finalize, isEmpty } from 'rxjs/operators';
import { DialogService } from 'src/app/service/dialog.service';
import { DialogData } from 'src/app/model/DialogData';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './create-edit-book.component.html',
  styleUrls: ['./create-edit-book.component.css'],
})
export class CreateEditBookComponent implements OnInit {
  @ViewChild('toolbar') private toolbar!: ToolBarComponent;
  @ViewChild('btnSubmit') private btnSubmit!: ElementRef;
  newBook = new Book();
  file: File | null = null;
  formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {
    this.initData();
    this.formGroup = this.formBuilder.group({
      name: ['name', [Validators.required, Validators.minLength(4)]],
      description: ['description', [Validators.maxLength(100)]],
      author: ['author', [Validators.required, Validators.maxLength(100)]],
    });
  }

  initData() { }

  get name() {
    return this.formGroup.get('name');
  }

  get author() {
    return this.formGroup.get('author');
  }

  get description() {
    return this.formGroup.get('description');
  }

  ngOnInit(): void {
    console.log(this.router.url);
    let action = this.activatedRoute.snapshot.queryParamMap.get('action')!;
    let id = this.activatedRoute.snapshot.queryParamMap.get('id')!;
    if (!this.isCreateScreen && !id) {
      this.router.navigate(['home'])
    }
    if (this.isEditScreen) {
      this.newBook.id = parseInt(id);
      this.bookService.getBook(id).subscribe(
        (res) => {
          console.log("subscribe->res: " + res.status);
          if ((res as any).error) {
            this.router.navigate(['home'])
          } else {
            this.newBook = res.body as Book;
          }
        },
        (err) => {
          console.log("subscribe->error: ");
          this.router.navigate(['home'])
        }
      );
    }
  }

  ngAfterViewInit() {
    console.log(this.toolbar);
  }

  get isEditScreen() {
    return this.router.url.startsWith('/edit')
  }

  get isCreateScreen() {
    return this.router.url.startsWith('/create')
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    if (!this.isEditScreen) {
      this.createBook();
    } else {
      this.editBook();
    }
    console.log('onSubmit');
  }

  createBook() {
    console.log('create');
    this.disableBtn(true)
    this.bookService.saveBook(this.newBook, this.file)
      .pipe(finalize(() => {
        this.disableBtn(false)
      }))
      .subscribe(
        (res) => {
          this.dialogService.openDialog(new DialogData('Created book'), () => {
            this.router.navigate(['home']);
          })
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editBook() {
    console.log('edit');
    this.disableBtn(true)
    this.bookService.putBook(this.newBook, this.file)
      .pipe(finalize(() => {
        this.disableBtn(false)
      }))
      .subscribe(
        (res) => {
          this.dialogService.openDialog(new DialogData('Updated book'), () => {
            this.router.navigate(['home']);
          })
          console.log(res);
        },
        (err) => { }
      );
  }

  get imageUrl() {
    if (
      !this.isEditScreen ||
      this.newBook.imageUrl?.startsWith('data:')
    ) {
      return this.newBook.imageUrl;
    } else {
      if (this.newBook.imageUrl) {
        return AppComponent.baseUrl + 'images/thumb_' + this.newBook.imageUrl;
      } else {
        return AppComponent.defaultBookCover;
      }
    }
  }

  onFileSelected(event: any) {
    console.log('onFileSelected');

    if (event.target.files.length > 0) {
      let pickedFile = event.target.files[0];
      console.log(pickedFile.name);
      var mimeType = pickedFile.type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(pickedFile);
      reader.onload = (_event) => {
        this.file = pickedFile;
        console.log(reader);
        this.newBook.imageUrl = reader.result as string;
      };
    }
  }

  disableBtn(isDisabled: boolean) {
    this.btnSubmit.nativeElement.disabled = isDisabled
  }
}
