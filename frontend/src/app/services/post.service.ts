import { Observable, first, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:8080/posts';
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Post[]> {
    console.log('[fetchAll] posts');
    return this.http
      .get<Post[]>(this.url, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Post[]>('fetchAll', []))
      );
  }

  createPost(formData: Partial<Post>, userId: number): Observable<Post> {
    console.log('[createPost]');
    return this.http
      .post<Post>(
        this.url,
        { title: formData.title, body: formData.body, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Post>('createPost'))
      );
  }

  deletePost(postId: number): Observable<Post> {
    console.log('[deletePost]');
    return this.http
      .delete<Post>(`${this.url}/${postId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Post>('deletePost'))
      );
  }
}
