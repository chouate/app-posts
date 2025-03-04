import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { error } from 'node:console';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiInMemory = 'api/posts'
  private apiSpring = 'http://localhost:8090/posts'
  //private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]); // Stocke les posts en temps réel
  posts$ = this.postsSubject.asObservable(); // Observable pour suivre les changements

  constructor(
    private http: HttpClient,
  ) { }

  //********************************************************************************
    getPostsFromApiSpring(): Observable<Post[]>{
      return this.http.get<Post[]>(this.apiSpring).pipe(
        tap( (response) => console.table(response)),
        //tap est un peu équivalant un console;log adapter à un observable
        catchError( (error) =>{
          console.log(error);
          return of ([])
        })
      )
    }
    getPostByIdFromApiSpring(postId:number):Observable<Post>{
      return this.http.get<Post>(`${this.apiSpring}/${postId}`)
    }

    addPostToApiSpring(post:Post):Observable<Post>{
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }

      return this.http.post<Post>(this.apiSpring, post, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error)=> this.handleError(error, null))
      );
    }

    updatePostFromApiSpring(post:Post):Observable<Post>{
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
      return this.http.put<Post>(`${this.apiSpring}/${post.id}`, post, httpOptions)
    }

    deletePostByIdFromApiSpring(postId:number):Observable<any>{
      return this.http.delete(`${this.apiSpring}/${postId}`).pipe(
        catchError( error =>{
          console.log(error);
          return of ([])
        })
      )
    }

    // addPostToApiSpring(post:Post):Observable<Post>{
      
    //   return this.http.post<Post>(this.apiSpring, Post).pipe(
    //     tap((response) => this.log(response)),
    //     catchError((error)=> this.handleError(error, null))
    //   );
    // }
  //********************************************************************************
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      tap(posts => this.postsSubject.next(posts)) // Met à jour la liste partagée
    );
  }

  getPostsFromInMemoryDb(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiInMemory).pipe(
      tap( (response) => console.table(response)),
      //tap est un peu équivalant un console;log adapter à un observable
      catchError( (error) =>{
        console.log(error);
        return of ([])
      })
    )
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

  // deletePostFromInMemoryDb(postId: number):Observable<any>{
  //   console.log(`Suppression du post avec l'ID: ${postId}`);

  //   return this.http.delete(`${this.apiInMemory}/${postId}`).pipe(
  //     tap(response => console.log("Réponse de la suppression:", response))
  //   );
  // }
  deletePostFromInMemoryDb(postId: number): Observable<any> {
    console.log(`Suppression du post avec l'ID: ${postId}`);
    return this.http.delete(`${this.apiInMemory}/${postId}`).pipe(
      tap(response => console.log("Réponse de la suppression:", response)),
      catchError(error => {
        console.error("Erreur lors de la suppression :", error);
        return of(null);
      })
    );
  }
  
  updatePostFromInMemoryDb(post: Post): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(`${this.apiInMemory}/${post.id}`,post, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
