import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Signup, Login } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signup(req: Signup): Observable<any> {
    return this.http.post('http://localhost:8000/api/v1/users/signup', req);
  }

  public login(req: Login): Observable<any> {
    return this.http.post('http://localhost:8000/api/v1/users/login', req);
  }
}
