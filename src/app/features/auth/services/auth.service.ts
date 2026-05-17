import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<User> {

    const fakeUser: User = {
      email,
      password,
      token: 'fake-jwt-token'
    };

    localStorage.setItem(
      'user',
      JSON.stringify(fakeUser)
    );

    this.currentUser.next(fakeUser);

    return of(fakeUser);

  }

  autoLogin() {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const parsedUser: User = JSON.parse(userData);

    this.currentUser.next(parsedUser);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }



}

