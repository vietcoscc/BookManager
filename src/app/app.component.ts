import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public static redirectToSignInHostedUI() {
    window.location.href = AppComponent.signInHostedUI
  }

  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  title = 'BookManager';
  constructor(private router: Router,
    public loaderService: LoaderService,
    public drawerService: DrawerService) {
    console.log(loaderService.isLoading.value);
  }
  ngOnInit(): void {

  }
  toggleDrawer() {
    console.log('toggleDrawer');

  }
  get isOnLogin() {
    return this.router.url.startsWith('/login')
  }
}
