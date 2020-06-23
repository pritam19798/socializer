import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:AngularFireAuth
  ) { }


  signUp(email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  getUser(){
    return this.auth.authState;
  }

  signOut(){
    return this.auth.signOut();
  }

  login() {
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }


  sendpasswordResetEmail(email:string){ 
    return this.auth.sendPasswordResetEmail(email)
  }

}
