import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(token): Observable<any> {
    return this.http.get(`http://localhost:8000/api/v1/users/${token}`);
  }
}
