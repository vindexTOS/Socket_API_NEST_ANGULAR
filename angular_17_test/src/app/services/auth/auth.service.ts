import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { userTypes } from '../../../Types/UserTypes';
import { Store } from '@ngrx/store';
import { getUserdata } from '../../Store/Auth/Auth-Store';
import { Router } from '@angular/router';
import * as jwt from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}
  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    let token = JSON.stringify(localStorage.getItem('token'));
    return token;
  }
  removeToken() {
    localStorage.removeItem('token');
    this.store.dispatch(getUserdata({ userData: {} }));
  }
  getDecodedUserInfo(): Object | null {
    const userData = localStorage.getItem('token');
    if (userData) {
      const tokenRaw: any = JSON.stringify(userData);

      let Decoded: any = jwt.jwtDecode(tokenRaw);

      this.store.dispatch(getUserdata({ userData: Decoded }));
    }
    return null;
  }
  createUser(user: userTypes) {
    console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(
      `${this.baseUrl}user/register`,
      { ...user },
      { headers }
    );
  }

  logInUser(user: userTypes) {
    return this.http.post(`${this.baseUrl}user/singin`, { ...user });
  }
}
