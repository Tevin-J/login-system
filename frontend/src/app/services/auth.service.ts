import { ErrorHandlerService } from './error-handler.service';
import { BehaviorSubject, catchError, first, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { TokenObject } from '../components/login/login.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/auth';
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userId!: number;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    console.log(`signup user ${user.email}`);
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<TokenObject> {
    console.log(`login user ${email}`);
    const payload = {
      email,
      password,
    };
    return this.http
      .post<TokenObject>(`${this.url}/login`, payload, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObj: TokenObject) => {
          this.userId = tokenObj.userId;
          localStorage.setItem('token', tokenObj.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['posts']);
        }),
        catchError(this.errorHandlerService.handleError<TokenObject>('login'))
      );
  }
}
