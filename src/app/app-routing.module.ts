import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditBookComponent } from './screen/create-edit-book/create-edit-book.component';
import { HomeComponent } from './screen/home/home.component';
import { LoginComponent } from './screen/login/login.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'create', component: CreateEditBookComponent },
  { path: 'edit', component: CreateEditBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  CreateEditBookComponent,
];
