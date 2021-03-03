import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateEditBookComponent } from './screen/create-edit-book/create-edit-book.component';
import { HomeComponent } from './screen/home/home.component';
import { LoginComponent } from './screen/login/login.component';
import { PageNotFoundComponent } from './screen/page-not-found/page-not-found.component';
import { SearchComponent } from './screen/search/search.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateEditBookComponent },
  { path: 'edit', component: CreateEditBookComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  CreateEditBookComponent,
];
