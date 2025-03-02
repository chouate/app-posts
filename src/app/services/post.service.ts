import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  //private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]); // Stocke les posts en temps réel
  posts$ = this.postsSubject.asObservable(); // Observable pour suivre les changements

  constructor(
    private http: HttpClient,
  ) { }

  // getPosts(): Observable<Post[]>{
  //   return this.http.get<Post[]>(this.apiUrl);
  // }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      tap(posts => this.postsSubject.next(posts)) // Met à jour la liste partagée
    );
  }
  // getLocalPosts(): Post[] {
  //   return this.posts;
  // }

  getLocalPosts(): Post[] {
    return this.postsSubject.getValue();
  }

  // setLocalPosts(posts: Post[]): void {
  //   this.posts = posts;
  // }

  // addPost(post: Post): void {
  //   // post.id = this.posts.length ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;
  //   this.posts.push(post);
  // }
  addPost(post: Post): void {
    const posts = this.getLocalPosts();
    post.id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    this.postsSubject.next([...posts, post]); // Met à jour la liste partagée
  }


  // updatePost(updatedPost: Post): void {
  //   const index = this.posts.findIndex(p => p.id === updatedPost.id);
  //   if (index !== -1) {
  //     this.posts[index] = updatedPost;
  //   }
  // }

  updatePost(updatedPost: Post): void {
    const posts = this.getLocalPosts();
    const index = posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
      this.postsSubject.next([...posts]); // Met à jour la liste partagée
    }
  }

  deletePost(id: number): void {
    const updatedPosts = this.getLocalPosts().filter(post => post.id !== id);
    this.postsSubject.next(updatedPosts);
  }

  
}
