import { ToolBarComponent } from './../../component/tool-bar/tool-bar.component';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { Form, FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { from } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from '../../service/book.service';
import { AlertModalComponent } from 'src/app/component/alert-modal/alert-modal.component';

export enum Action {
  Create,
  Edit
}

@Component({
  templateUrl: './create-edit-book.component.html',
  styleUrls: ['./create-edit-book.component.css'],
})

export class CreateEditBookComponent implements OnInit {

  @Input() action: Action = Action.Create;
  @Input() book!: Book;

  @ViewChild('modal') private modal!: AlertModalComponent;
  @ViewChild('toolbar') private toolbar!: ToolBarComponent;

  bookValue = new Book();
  file = null;
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    this.formGroup = this.formBuilder.group({
      name: ['name', [Validators.required, Validators.minLength(4)]],
      description: ['description', [Validators.maxLength(100)]],
      author: ['author', [Validators.required, Validators.maxLength(100)]]
    });
  }

  get name() {
    console.log(this.formGroup.get('name'));
    return this.formGroup.get('name')
  }

  get author() {
    return this.formGroup.get('author')
  }

  get description() {
    return this.formGroup.get('description')
  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log(this.toolbar);
    console.log(this.modal);
    this.toolbar.setScreenName(Action[this.action] + " Book")
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.modal.open("Invalid")
      return
    }
    if (this.action == Action.Create) {
      console.log('create');
      this.bookService.saveBook(this.bookValue, this.file).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('edit');
    }
    console.log('onSubmit');
  }

  onFileSelected(event: any) {
    console.log('onFileSelected');

    if (event.target.files.length > 0) {
      let pickedFile = event.target.files[0];
      console.log(pickedFile.name);
      var mimeType = pickedFile.type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported.");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(pickedFile);
      reader.onload = (_event) => {
        console.log(typeof (reader.result));
        this.bookValue.imageUrl = reader.result as string;
      }
    }
  }
}
