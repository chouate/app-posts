import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from '../../models/post';
import { error } from 'node:console';
import { response } from 'express';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css'
})
export class FormPostComponent implements OnInit{

  formPost!: FormGroup;
  postId: number;
  constructor(
    private postservice: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ){}

  ngOnInit(): void {
      this.postId = Number(this.route.snapshot.paramMap.get('id'));

      if(this.postId){
        // const post  = this.postservice.getLocalPosts().find(p => p.id === this.postId);
        this.postservice.getPostByIdFromApiSpring(this.postId).subscribe({
          next: (postResponse)=>{
            console.log("le poste est retourné avec succé: ", postResponse);
            
            console.table(postResponse);
            if(postResponse){
              this.formPost = this.formBuilder.group({
                // id: [post.id, Validators.required],
                userId: [postResponse.userId, Validators.required],
                title: [postResponse.title,Validators.required],
                body: [postResponse.body, Validators.required]
              });
    
            }
          },
          error: (err)=> console.error("Erreur lors de récyupération du poste!")
        });
        
      }else{
        this.formPost = this.formBuilder.group({
          // id: ['', Validators.required],
          userId: ['', Validators.required],
          title: ['',Validators.required],
          body: ['', Validators.required]
        });
      }
      
  }

  saveChanges():void{
    if(this.formPost.valid){
      if (this.postId) {
        const updatedPost: Post = {
          id: this.postId,
          userId: this.formPost.value.userId,
          title: this.formPost.value.title,
          body: this.formPost.value.body,
        };
        this.postservice.updatePostFromApiSpring(updatedPost).subscribe({
          next: (postModified)=>{
            console.log("la modification du post "+updatedPost.id+" est réussie.");
            console.table("le post modifié est : "+postModified);
          },
          error: (err)=> console.error("Erreur lors de la modification !", err)
        }); // Modification
      } else {
        const newPost:Post = {
          id: this.formPost.value.id,
          userId: this.formPost.value.userId,
          title: this.formPost.value.title,
          body: this.formPost.value.body,
        }
        this.postservice.addPostToApiSpring(newPost).subscribe({
          next: (post) =>{
            console.log("ajout réussie !");
          },
          error: (err) => console.error("Erreur lors de l'ajout d'un post: ", err)
        }); // Ajout
      }

      //this.postservice.updatePost(updatedPost);
      this.router.navigate(['/']);
    }
  }

}
