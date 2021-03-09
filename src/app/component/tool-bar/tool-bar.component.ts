import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {
  screenName: string = '';
  searchInput = ''
  @Output() toggleDrawer = new EventEmitter<string>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  public get isDisplayed(): boolean {
    return this.router.url.startsWith("/home")
  }

  ngOnInit(): void {
  };

  onMenuClick() {
    console.log('onMenuClick');
    this.toggleDrawer.emit()
  }

  onSearch() {
    console.log('onSearch');

    this.searchService.onSearch(this.searchInput)
  }

  logout() {
    console.log('logout');
    this.storage.setLoggedOut()
    AppComponent.redirectToSignInHostedUI()
  }
}
