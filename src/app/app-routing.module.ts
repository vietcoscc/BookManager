import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateEditBookComponent } from './screen/create-edit-book/create-edit-book.component';
import { HomeComponent } from './screen/home/home.component';
import { LoginComponent } from './screen/login/login.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateEditBookComponent },
  { path: 'edit', component: CreateEditBookComponent },
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
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
