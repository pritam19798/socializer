import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { 
  faThumbsUp,
  faThumbsDown,
  faShareSquare
} from '@fortawesome/free-regular-svg-icons'
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {

  @Input() post;

  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown;
  faShareSquare=faShareSquare;

  uid=null;
  upvote=0;
  downvote=0;

  constructor(
    private auth:AuthService,
    private db:AngularFireDatabase,
    private dbs:AngularFirestore
  ) { 
    auth.getUser().subscribe((user)=>{ 
      this.uid=user?.uid;
    });
  }

  ngOnInit(): void {
    // console.log(this.post)
  }

  ngOnChanges(): void{ 
    if (this.post.vote){
      Object.values(this.post.vote).map((val:any)=>{ 
        if (val.upvote) {
          this.upvote +=1
        }
        if (val.downvote) {
          this.downvote +=1
        }
      })
    }
  }

  handleUpVote(){ 
    // console.log('up') 
    let uid= this.uid
    Object.values(this.post).map((val:any)=>{
      
      if (typeof(val)=="object") {
        // console.log(typeof(val[uid]))
        let vote=val[uid]
        // console.log(vote["upvote"])
        if (vote) {
          if (vote["upvote"]) {
            // console.log('dont like ')
            this.db.object(`/posts/${this.post.id}/vote/${this.uid}/upvote`).remove().then((val:any)=>{
              // console.log(val)
            })
          }
          else{
            this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
              upvote:1
            })  
            // console.log('hhh')
          }
        }
        else{
          this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
            upvote:1
          })  
          // console.log('hhh')
        }
      }
      else{
        this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
          upvote:1
        })  
        // console.log('hhh')
      }
    })
    // this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
    //   upvote:1
    // }) 


  }

  handleDownVote(){
    // console.log('down') 
    let uid= this.uid
    Object.values(this.post).map((val:any)=>{
      
      if (typeof(val)=="object") {
        // console.log(typeof(val[uid]))
        let vote=val[uid]
        // console.log(vote["upvote"])
        if (vote) {
          if (vote["downvote"]) {
            // console.log('dont like ')
            this.db.object(`/posts/${this.post.id}/vote/${this.uid}/downvote`).remove().then((val:any)=>{
              // console.log(val)
            })
          }
          else{
            this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
              downvote:1
            })  
            // console.log('hhh')
          }
        }
        else{
          this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
            downvote:1
          })  
          // console.log('hhh')
        }
      }
      else{
        this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
          downvote:1
        })  
        // console.log('hhh')
      }
    })
    // this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ 
    //   downvote:1
    // })
  }

}
