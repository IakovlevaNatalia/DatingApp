import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe (
      map(user => {
          if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user=> {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
  }

    logout() {
      localStorage.removeItem('user');
      this.currentUser.set(null);
  }
}
