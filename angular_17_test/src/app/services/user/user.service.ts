import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllusers(search: string) {
    return this.http.get(`${this.baseUrl}user/getallusers?search=${search}`);
  }
}
