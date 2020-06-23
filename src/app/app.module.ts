import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


//form and hhtpclient
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//firebase related imports
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';

//for toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    AddPostComponent,
    PageNotFoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
