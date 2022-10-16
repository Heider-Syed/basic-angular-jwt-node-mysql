import { Component, OnInit } from '@angular/core';

import { Observable } from"rxjs";

import { PostsService } from "src/app/services/posts.service";
import { AuthService } from "src/app/services/auth.service";

import { User } from 'src/app/models/user.model';
import { Posts } from 'src/app/models/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  //almacena los posts
  posts$!: Observable<Posts[]>;
  userId!: Pick<User, "id"> | number;

  constructor(private postService: PostsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.posts$ = this.fetchAll();
    //hace que el id del usuario sea accesible desde este componente
    this.userId= this.authService.userId;

  }

  fetchAll(): Observable<Posts[]>{
    return this.postService.fetchAllPosts();
  }

  createPost(): void{
    this.posts$ = this.fetchAll();
  }

  deletePost(postId: Posts["id"]): void{
    this.postService.deletePost(postId).subscribe(() =>(this.posts$ = this.fetchAll()));
  }


}