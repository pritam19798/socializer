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

//uid
import { v4 as uuid,v3 as uuidv3 } from 'uuid'
import { async } from 'rxjs/internal/scheduler/async';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  title:string;
  description:string;
  picture:string=null;

  user=null;
  uploadPercent:number=null;
  uid=null;
  postuid=uuid()

  constructor(
    private toastr:ToastrService,
    private auth:AuthService,
    private router: Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage,
    
  ) {
    auth.getUser()
    .subscribe(
      (user)=>{ 
        this.uid=user.uid
        this.db.object(`users/${ user.uid }`)
        .valueChanges()
        .subscribe(
          (res)=>{ 
            this.user=res
          }

        );
      }
    );
   }

  ngOnInit(): void {
  }

  onSubmit(){
    const uid=this.postuid
    this.db.object(`posts/${ uid }`)
    .set({ 
      id:uid,
      title:this.title,
      description:this.description,
      picture:this.picture,
      by:this.user.name,
      socializerId:this.user.username,
      date:Date.now()
    })
    .then(
      (res)=>{
        this.toastr.success(`post updated successfully`,"",{ closeButton:true})
       }

    )
    .catch(
      (err)=>{ 
        this.toastr.error(err.message,"",{ closeButton:true})
      }
    );

    this.router.navigateByUrl('/')
    
  }

  async uploadFile(event){ 
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file, imageConfig);

    const filePath = `/${ this.uid}/posts/${this.postuid}/${uuidv3(file.name,uuidv3.DNS)}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, resizedImage);

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.toastr.success("Image upload Success");
        });
      }),
    ).subscribe();
  }
  

}
