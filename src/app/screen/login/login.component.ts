import { LoginRequest } from './../../model/LoginRequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../../component/alert-modal/alert-modal.component';
import { from } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private FormBuilder: FormBuilder,
    private loaderService: LoaderService,
    private cdref: ChangeDetectorRef,
    private authService: AuthService,
    private storage: LocalStorageService
  ) {
    console.log('constructor');

  }

  loginRequest = new LoginRequest('admin', 'admin');

  showSpinner: boolean = false;
  ngOnInit() {
    if(this.storage.getItem('login') == 'logged'){
      this.router.navigate(['home'])
    }
    this.formGroup = this.FormBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  onSubmit(): void {
    this.userService
      .login(
        new LoginRequest(this.loginRequest.username, this.loginRequest.password)
      )
      .subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.storage.setItem('login','logged')
          this.router.navigate(['home']);
        },
        (err) => {
          this.modalComponent.open('Invalid username or passowrd');
          console.log('HTTP Error', err);
        },
        () => {
          console.log('HTTP request completed.');
        }
      );
  }

  // @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
    }
    // Your row selection code
  }
}
