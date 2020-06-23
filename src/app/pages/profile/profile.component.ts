import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


//image Compressor browser-image-resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';
import { v3 as uuidv3 } from 'uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid=null;
  user=null;
  uploadPercent:number=null;
  ob=null;
  phoUpload=false

  name:string=null;
  email:string=null
  bio:string=null
  username:string=null
  country:string=null
  picture:string="https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";
  constructor(
    private toastr:ToastrService,
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage
  ) { 
    auth.getUser().subscribe(
      (user)=>{
        // console.log(user)
        this.uid=user?.uid
        this.email=user?.email
        // console.log(this.uid)
        // this.name=user?.name
        this.ob=db.object(`/users/${this.uid}`)
        .valueChanges()
        this.ob.subscribe(
          (obj)=>{ 
            if (obj) {
              this.user=obj
              // console.log(this.user) 
              this.name=this.user.name
              this.email=this.user.email
              this.bio=this.user.bio
              this.username=this.user.username
              this.picture=this.user.picture
              this.country=this.user.country
              // console.log(this.country)
            }
          }
        )  
      }
    )
 }



  ngOnInit(): void {
    this.phoUpload=false
  }
  onSubmit(){
    // console.log('aaa')
    // const {email,password,username,name ,country , bio} =f.form.value;
    this.db.object(`users/${this.uid}`)
    .set({
      id:this.uid,
      name:this.name,
      email:this.email,
      bio:this.bio,
      username:this.username,
      country:this.country,
      picture:this.picture
    })
    .then(()=>{
      this.router.navigateByUrl('/')
      this.toastr.success(`profile updated successfull`,"",{ closeButton:true})
      // console.log('aaa')
    })
    .catch((err)=>{
      this.toastr.error(`update failed`,"",{ closeButton:true});
    })    


  }

  async uploadImage(event){ 
    const file=event.target.files[0];
    let resizedImage= await readAndCompressImage(file,imageConfig)
    let filePatth:string
    filePatth=`${this.uid}/profile_picture/${uuidv3(file.name,uuidv3.DNS)}`

    const fileRef=this.storage.ref(filePatth)
    const task =this.storage.upload(filePatth,resizedImage)
    task.percentageChanges().subscribe(
      (percentage)=>{ 
        this.uploadPercent=percentage;
      }
    )
    task.snapshotChanges()
    .pipe(
      finalize(()=>{ 
        fileRef.getDownloadURL().subscribe((url)=>{ 
          this.picture=url;
          this.toastr.success(`picture upload sucessfull`)

        })
      })
    )
    .subscribe();
    this.phoUpload=true  
  }

  resetPassword(){ 
    
    this.auth.sendpasswordResetEmail(this.email)
    .then(()=>{ 
      // console.log('aaa')
      this.toastr.info(`A passowrd reset mail have sent to ${ this.email}`)
    })
  }
  
}
