import { Injectable } from '@angular/core';
import { POSTS } from './post-list';

@Injectable({
  providedIn: 'root'
})
export class AngularInMemoryWebApiService {

  constructor() { }
  createDb(){
    const posts= POSTS;
    return {posts };
  }
}
