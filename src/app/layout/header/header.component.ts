import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  openNav=true
  email=null;
  name=null;
  user=null;
  constructor(
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private toastr: ToastrService
  ) { 
    auth.getUser().subscribe(
      (user)=>{
        // console.log(user)
        this.email=user?.email
        // this.name=user?.name
        db.object(`/users/${user?.uid}`)
        .valueChanges()
        .subscribe(
          (obj)=>{ 
            if (obj) {
              this.user=obj
              // console.log(this.user) 
              this.name=this.user.name
             
            }
          }
        )
        
      }
    )
  }

  ngOnInit(): void {
  }



  async handleSignOut(){
    try {
      this.auth.signOut()
      .then(
        ()=>{
          this.email=null;
          this.router.navigateByUrl('/signin')
          this.toastr.info(`logout success`,"",{ closeButton:true})
        }
      )
    } catch (error) {
      this.toastr.error(`problem in Signing Out`)
    }
  }
  toggleNav(){
    this.openNav=!this.openNav
  }

}
