import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { AlertModalComponent } from '../../component/alert-modal/alert-modal.component';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: AlertModalComponent;

  constructor(private router: Router, private userService: UserService) {}

  username: string = '';
  password: string = '';
  showSpinner: boolean = false;
  ngOnInit() {}

  login(): void {
    this.userService
      .login(new LoginRequest(this.username, this.password))
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
    if (event.key == 'Enter' && !this.modalComponent.isOpen()) {
      this.login();
    }
    // Your row selection code
  }
}
