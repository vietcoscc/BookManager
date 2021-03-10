import { LoginRequest } from './../../model/LoginRequest';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef, } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Action } from 'src/app/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private FormBuilder: FormBuilder,
    private loaderService: LoaderService,
    private cdref: ChangeDetectorRef,
    private storage: LocalStorageService,
    private route: ActivatedRoute
  ) {
    console.log('constructor');
  }

  loginRequest = new LoginRequest('', '');
  showSpinner: boolean = false;
  ngOnInit() {
    let rePasswordValidator = null
    console.log(this.router.url);

    if (this.router.url == '/register') {
      rePasswordValidator = [Validators.required, this.rePasswordValidator()]
    }
    this.formGroup = this.FormBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
      rePassword: ['', rePasswordValidator],
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

  get rePassword() {
    return this.formGroup.get('rePassword');
  }

  get action() {
    if (this.router.url != '/register') {
      return 'Login';
    } else {
      return 'Register';
    }
  }

  public get isLogin() {
    return this.router.url != '/register';
  }

  rePasswordValidator(): ValidatorFn {
    console.log(this.formGroup);

    return (control: AbstractControl): { [key: string]: any } | null => {
      let currentPassword = control.parent?.get('password')?.value;
      const invalid = control.value != currentPassword;
      return invalid ? { repassowrd: { value: control.value } } : null;
    };
  }

  onSubmit(): void {
    if (this.router.url == '/login') {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.userService
      .login(
        new LoginRequest(this.loginRequest.username, this.loginRequest.password)
      )
      .subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.storage.setItem('login', 'logged');
          this.router.navigate(['home']);
        },
        (err) => {
          console.log('HTTP Error', err);
        }
      );
  }

  register() {
    this.userService
      .register(
        new LoginRequest(this.loginRequest.username, this.loginRequest.password)
      )
      .subscribe(
        (res) => {
          console.log('HTTP response', res);
          this.router.navigate(['login']);
        },
        (err) => {
          console.log('HTTP Error', err);
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
