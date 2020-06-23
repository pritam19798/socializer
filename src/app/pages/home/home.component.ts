import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users=[];
  posts=[];
  isLoading=false
  constructor(
    private toastr:ToastrService,
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage
  ) { 
    this.isLoading=true

    //loading users
    db.object('/users')
    .valueChanges()
    .subscribe(
      (obj)=>{ 
        if (obj) {
          this.users=Object.values(obj)
          this.isLoading=false
        }else{ 
          toastr.error('No Curren User find!!',"",{ closeButton:true});
          this.users=[];
          this.isLoading=false;
        }
      }
    )
    //loading posts
    db.object('/posts')
    .valueChanges()
    .subscribe(
      (obj)=>{ 
        if (obj) {
          this.posts=Object.values(obj)
          this.isLoading=false
        }else{ 
          toastr.error('No Posts find!!',"",{ closeButton:true});
          this.posts=[];
          this.isLoading=false;
        }
      }
    )   


  }

  ngOnInit(): void {
  }



}
