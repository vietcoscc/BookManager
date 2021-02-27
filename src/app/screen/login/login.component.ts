import { LoginRequest } from './../../model/LoginRequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../../component/alert-modal/alert-modal.component';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  formGroup!: FormGroup

  constructor(private router: Router, private userService: UserService, private FormBuilder: FormBuilder) { }

  loginRequest = new LoginRequest('admin', 'admin')

  showSpinner: boolean = false;
  ngOnInit() {
    this.formGroup = this.FormBuilder.group({
      username: ['', Validators.required, Validators.minLength(10)],
      password: ['', Validators.required]
    })
  }

  get username() {
    return this.formGroup.get('username')
  }

  get password() {
    return this.formGroup.get('password')
  }

  onSubmit(): void {
    this.userService
      .login(new LoginRequest(this.loginRequest.username, this.loginRequest.password))
      .subscribe(
        (res) => {
          this.router.navigate(['home'])
          console.log('HTTP response', res);
        },
        (err) => {
          this.modalComponent.open('Invalid username or passowrd')
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
