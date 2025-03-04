import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modals/modal/modal.component';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = []; // Liste filtrée
  searchText: any;

  @ViewChild(ModalComponent) modal!: ModalComponent;
  selectedPost: Post | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 20; 
  
  
  constructor(
    private postservice: PostService,
    private router: Router,
  ){}

  ngOnInit(): void {
    
    // this.postservice.posts$.subscribe(data => {
    //   this.posts = data;
    //   this.filteredPosts = data; // Initialiser la liste affichée

    // });
    this.postservice.getPostsFromApiSpring().subscribe(data => {
      this.posts = data;
      this.filteredPosts = data; // Initialiser la liste affichée

    });

    // // Charger les posts si la liste filtré est vide
    // if (this.filteredPosts.length === 0 ) {
    //   this.postservice.getPosts().subscribe();
    // }
    
    // // Charger les posts si la liste filtré est vide
    // if (this.posts.length === 0 ) {
    //   this.postservice.getPosts().subscribe();
    // }
  }

  // deletePost(id: number): void {
  //   var res = confirm("Êtes-vous sûr de vouloir supprimer?");
  //   if(res){
  //     this.postservice.deletePostByIdFromApiSpring(id);
  //   }
  // }
  deletePost(id: number): void {
    console.log("ID envoyé pour suppression :", id); // Vérification
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      this.postservice.deletePostByIdFromApiSpring(id).subscribe({
        next: () => {
          console.log("Suppression réussie !");
          this.loadPosts();
        },
        error: (err) => console.error("Erreur lors de la suppression :", err)
      });
    }
  }
  
  loadPosts(): void {
    this.postservice.getPostsFromApiSpring().subscribe({
      next: (data) => {
        this.filteredPosts = data;
      },
      error: (err) => console.error("Erreur lors du chargement des posts :", err)
    });
  }
  
  
  editPost(id: number): void {
    this.router.navigate(['/editPost', id]); 
  }
  addPost(): void {
    this.router.navigate(['/addPost']); // Redirige vers le formulaire en mode ajout
  }

  filterPostsByTitle($event : Event){
    const input = $event.target as HTMLInputElement;
    console.log(input.value);
    this.filteredPosts = this.posts.filter( (post) =>{
      if(post.title.toLowerCase().includes(input.value.toLowerCase())){
       return post;
      }
      return 0;
    });
  }

  updatePost(updatedPost: Post) {
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost; // Mise à jour du post modifié
    }
  }


  showPostDetails(post: Post) {
    this.selectedPost = post; // Stocke le post sélectionné
    this.modal.openModal(); // Ouvre le modal
  }
}
