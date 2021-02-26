import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
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
@Component({
  templateUrl: './create-edit-book.component.html',
  styleUrls: ['./create-edit-book.component.css'],
})
export class CreateEditBookComponent implements OnInit {
  @Input() action: string = 'create';
  @Input() book!: Book;
  bookValue = new Book();
  file = null;
  formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.action == 'create') {
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
      console.log(event.target.files[0].name);
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }
}
