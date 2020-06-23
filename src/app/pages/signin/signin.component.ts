import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router:Router,
    private toasr:ToastrService   
  ) { }

  ngOnInit(): void {
  }

  handlesignin(f:NgForm){
    if (!f.form.valid) {
      if (f.form.controls.email.invalid) {
        this.toasr.error('Please provide your email',"",{ closeButton:true});
      }      
      if (f.form.controls.password.invalid) {
        this.toasr.error('Please provide your password',"",{ closeButton:true});
      }      
    }
    else{
      const {email,password }=f.form.value   
      this.auth.signIn(email,password)
      .then(
        (res)=> {
          this.router.navigateByUrl('/') 
          this.toasr.success(`Login Success!!`,"",{ closeButton:true})
        } 
      )
      .catch(
        (err)=>{ 
          this.toasr.error(err.message,"",{ closeButton:true})
        }

      )
    }
  } 

  googleSignIn(){ 
    this.auth.login()
    .then(
      (res)=>{
        this.router.navigate(['/Profile'])
      }
    );
  } 

}
