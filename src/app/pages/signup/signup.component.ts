import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouteReuseStrategy } from '@angular/router';

//rxjs
import {finalize } from 'rxjs/operators';

//angular form
import { NgForm } from '@angular/forms';

//Angularfire
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database'

//image Compressor browser-image-resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';
import { v3 as uuidv3 } from 'uuid';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  uploadPercent:number=null;
  pictureUrl:string=
 "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";
  
  constructor(
    private toastr:ToastrService,
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    if (!f.form.valid) {
      if (f.form.controls.name.invalid) {
        this.toastr.error('Please provide your name',"",{ closeButton:true});
      }
      if (f.form.controls.email.invalid) {
        this.toastr.error('Please provide your email',"",{ closeButton:true});
      }      
      if (f.form.controls.password.invalid) {
        this.toastr.error('Please provide your password',"",{ closeButton:true});
      }      
      if (f.form.controls.username.invalid) {
        this.toastr.error('Please provide your username',"",{ closeButton:true});
      }      
      if (f.form.controls.country.invalid) {
        this.toastr.error('Please provide your country',"",{ closeButton:true});
      }      
      if (f.form.controls.bio.invalid) {
        this.toastr.error('Please provide your bio',"",{ closeButton:true});
      }
      
      
    }else{
      const {email,password,username,name ,country , bio} =f.form.value;
      this.auth.signUp(email,password)
      .then(
        (res)=>{
          console.log(res);
          const {uid}=res.user


          this.db.object(`users/${uid}`)
          .set({
            id:uid,
            name:name,
            email:email,
            bio:bio,
            username:username,
            country:country,
            picture:this.pictureUrl
          })
        this.router.navigateByUrl('/');
        this.toastr.success(`sign up succesfull`);

        }
      )
      .catch((err)=>{
        this.toastr.info(err.message,"",{ closeButton:true});
      })
    }
  }



  handleGoogleSignUp(){ 
    this.auth.login()
    .then(
      (res)=>{
        this.router.navigate(['/Profile'])
      }
    );
  }



}
