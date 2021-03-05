import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {
  screenName: string = '';
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
  };


  public setScreenName(screenName: string) {
    console.log('setScreenName: ' + screenName);
    this.screenName = screenName;
    this.changeDetectorRef.detectChanges();
  }

  logout() {
    console.log('logout');
    this.storage.setLoggedOut()
    AppComponent.redirectToSignInHostedUI()
  }
}
