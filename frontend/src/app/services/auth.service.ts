import { ErrorHandlerService } from './error-handler.service';
import { catchError, first, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/auth/signup';
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    console.log(`signup user ${user.email}`);
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      first(),
      tap((res) => console.log(res)),
      catchError(this.errorHandlerService.handleError<User>('signup'))
    );
  }
}
