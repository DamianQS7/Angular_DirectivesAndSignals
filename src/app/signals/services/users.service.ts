import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://reqres.in/api/users';

  public getUserById(id: number): Observable<User> {
    return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map( response => response.data)
      )
  }
}
