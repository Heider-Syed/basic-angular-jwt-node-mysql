import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { User } from "../models/user.model";
import { Posts } from "../models/posts.model";
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private POSTS_API_URL ="http://localhost:3000/api/posts/";

  httpOptions: {headers: HttpHeaders} ={
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }
  

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }


  //obtiene los datos de los posts del servidor
  fetchAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.POSTS_API_URL, { responseType: "json" }).pipe(
      catchError(this.errorHandlerService.handleError<Posts[]>("fetchAllPosts", []))
    )
  }

  //crea un nuevo post
  createPost(formData: Partial<Posts>): Observable<Posts> {
    return this.http.post<Posts>(this.POSTS_API_URL, { title: formData.title, body: formData.body}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Posts>("createPost"))
    )
  }

  //elimina el post creado por el usuario
  //el observable espera nada por lo tanto esta vacio
  deletePost(postId: Posts["id"]): Observable<{}> {
    return this.http.delete<Posts>(`${this.POSTS_API_URL}/${postId}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Posts>("deletePost"))
    )
  }

}