import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser, User } from '@app/types';
import { BehaviorSubject, interval, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _apiBaseUrl = "https://jsonplaceholder.typicode.com"
  private readonly _userRefresh$ = new BehaviorSubject<void>(undefined);

  constructor(private readonly http: HttpClient) {
    // Occasional fetch in case some some other user has changed user listing, could be done via ws events if available
    interval(30000).subscribe(() => this._userRefresh$.next());
  }

  getUsers(): Observable<User[]> {
    return this._userRefresh$.pipe(switchMap(() =>
      this.http.get<User[]>(this._apiBaseUrl + "/users")));
  }

  createUser(userData: NewUser): Observable<User> {
    // Post user data and refresh user listing
    return this.http.post<User>("localhost", userData).pipe(tap(() => this._userRefresh$.next()));
  }

  deleteUser(id: string): Observable<void> {
    // Post user data and refresh user listing
    return this.http.delete<void>("localhost", {
      params: {
        id
      }
    }).pipe(tap(() => this._userRefresh$.next()));
  }
}
