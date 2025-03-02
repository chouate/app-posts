import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { FormPostComponent } from './components/form-post/form-post.component';

const routes: Routes = [
  {path: '', component: ListPostsComponent},
  {path: 'addPost', component: FormPostComponent},
  {path: 'editPost/:id', component: FormPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
