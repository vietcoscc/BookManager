import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDialogComponent } from './component/app-dialog/app-dialog.component';
import { DialogService } from './service/dialog.service';
import { DrawerService } from './service/drawer.service';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public static baseUrl = 'http://bookmanagerapi-env.eba-vauyz3hm.us-west-2.elasticbeanstalk.com/';
  // public static baseUrl = 'http://localhost:5000/';
  public static defaultBookCover = 'https://images-na.ssl-images-amazon.com/images/I/31M3X330W1L._SX295_BO1,204,203,200_.jpg';
  public static signInHostedUI = 'https://bookmanagerf44556a1-f44556a1-dev.auth.us-west-2.amazoncognito.com/login?client_id=2jknutj16jdovj5faq4jkt5qks&response_type=code&scope=email+phone+openid+aws.cognito.signin.user.admin+profile&redirect_uri=http://localhost:4200/home'
  public static awsDoMainPrefix = 'https://bookmanagerf44556a1-f44556a1-dev.auth.us-west-2.amazoncognito.com'
  public static clientId = '2jknutj16jdovj5faq4jkt5qks'
  public static clientSecret = '11srlceepn4fsdcijn7ivp12ugp1fo7smsnsflhk8v4tkqcqaums'
  public static grantType = 'authorization_code'
  public static redirectUri = 'http://localhost:4200/home'
  public static githubUrl = 'https://github.com/vietcoscc/BookManager/tree/dev'
  public static githubAPIUrl = 'https://github.com/vietcoscc/BookManagerAPI/tree/dev-vietnq'

  public static redirectToSignInHostedUI() {
    window.location.href = AppComponent.signInHostedUI
  }

  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  title = 'BookManager';
  constructor(private router: Router,
    public loaderService: LoaderService,
    public drawerService: DrawerService,
    public dialogService: DialogService) {
    console.log(loaderService.isLoading.value);
  }

  ngOnInit(): void {

  }

  toggleDrawer() {
    console.log('toggleDrawer');

  }

  onGithubClick() {
    window.open(AppComponent.githubUrl)
  }

  onGithubAPIClick() {
    window.open(AppComponent.githubAPIUrl)
  }

  onInfoClick() {
    window.open(AppComponent.baseUrl + "swagger-ui/index.html")
  }

  get isOnLogin() {
    return this.router.url.startsWith('/login')
  }
}
