import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
{
  path:'',
  component: HomeComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectUnauthorizedToLogin}
},
{
  path:'signin',
  component: SigninComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectLoggedInToHome}
},
{
  path:'signup',
  component: SignupComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectLoggedInToHome}
},
{
  path:'addpost',
  component: AddPostComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectUnauthorizedToLogin}
},
{
  path:'Profile',
  component: ProfileComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: redirectUnauthorizedToLogin}
},
{
  path:'**',
  component: PageNotFoundComponent,
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
