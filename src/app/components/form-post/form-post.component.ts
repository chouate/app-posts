import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from '../../models/post';

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
        const post  = this.postservice.getLocalPosts().find(p => p.id === this.postId);
        if(post){
          this.formPost = this.formBuilder.group({
            // id: [post.id, Validators.required],
            userId: [post.userId, Validators.required],
            title: [post.title,Validators.required],
            body: [post.body, Validators.required]
          });

        }
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

      const newPost:Post = {
        id: this.formPost.value.id,
        userId: this.formPost.value.userId,
        title: this.formPost.value.title,
        body: this.formPost.value.body,
      }
      const updatedPost: Post = {
        id: this.postId,
        userId: this.formPost.value.userId,
        title: this.formPost.value.title,
        body: this.formPost.value.body,
      };

      if (this.postId) {
        this.postservice.updatePost(newPost); // Modification
      } else {
        this.postservice.addPost(newPost); // Ajout
      }

      this.postservice.updatePost(updatedPost);
      this.router.navigate(['/']);
    }
  }

}
