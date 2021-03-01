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
import { from } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

export enum Action {
  Create,
  Edit,
}

@Component({
  templateUrl: './create-edit-book.component.html',
  styleUrls: ['./create-edit-book.component.css'],
})
export class CreateEditBookComponent implements OnInit {
  @ViewChild('modal') private modal!: AlertModalComponent;
  @ViewChild('toolbar') private toolbar!: ToolBarComponent;
  screenAction: Action = Action.Create;
  newBook = new Book();
  file = null;
  formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initData();
    this.formGroup = this.formBuilder.group({
      name: ['name', [Validators.required, Validators.minLength(4)]],
      description: ['description', [Validators.maxLength(100)]],
      author: ['author', [Validators.required, Validators.maxLength(100)]],
    });
  }

  initData() {}

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
    console.log();
    let action = this.activatedRoute.snapshot.queryParamMap.get('action')!;
    let id = this.activatedRoute.snapshot.queryParamMap.get('id')!;
    // let data = this.router.getCurrentNavigation()?.extras.queryParams;
    // console.log(data);
    // this.screenAction = data?.action;
    if (action == '1' && id != null) {
      this.screenAction = Action.Edit;
    } else {
      this.screenAction = Action.Create;
    }
    if (this.screenAction == Action.Edit) {
      this.newBook.id = parseInt(id);
      this.bookService.getBook(id).subscribe(
        (res) => {
          this.newBook = res.body as Book;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngAfterViewInit() {
    console.log(this.toolbar);
    console.log(this.modal);

    this.toolbar.setScreenName(Action[this.screenAction] + ' Book');
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.modal.open('Invalid');
      return;
    }
    if (this.screenAction == Action.Create) {
      this.createBook();
    } else {
      this.editBook();
    }
    console.log('onSubmit');
  }

  createBook() {
    console.log('create');
    this.bookService.saveBook(this.newBook, this.file).subscribe(
      (res) => {
        this.modal.open('Created book');
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editBook() {
    console.log('edit');
    this.bookService.putBook(this.newBook).subscribe(
      (res) => {
        this.modal.open('Edited book');
        console.log(res);
      },
      (err) => {}
    );
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
        console.log(typeof reader.result);
        this.newBook.imageUrl = reader.result as string;
      };
    }
  }
}
