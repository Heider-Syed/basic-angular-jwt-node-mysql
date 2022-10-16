import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importa el auth guard para ver si el usuario esta logeado
import { AuthGuardService  } from './services/auth-guard.service';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "posts", component: PostsComponent, canActivate: [AuthGuardService]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }