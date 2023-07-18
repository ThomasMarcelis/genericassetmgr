import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        { id: 1, userId: 'external-id-1', userName: 'User 1', userRole: 'Admin', userEmail: 'user1@example.com', description: 'Description 1' },
        { id: 2, userId: 'external-id-2', userName: 'User 2', userRole: 'User', userEmail: 'user2@example.com', description: 'Description 2' },
        // Add more mock data as needed
    ];

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getUsers(): Observable<User[]> {
    return this.configService.useMockData 
      ? of(this.users) 
      : this.http.get<User[]>(this.apiUrl('users')).pipe(catchError(this.handleError));
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.configService.useMockData 
      ? of(this.users.find((u) => u.id === id)) 
      : this.http.get<User>(this.apiUrl(`users/${id}`)).pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    if (this.configService.useMockData) {
      const newUser = { ...user, id: this.generateUniqueId() };
      this.users = [...this.users, newUser];
      return of(newUser);
    } else {
      return this.http.post<User>(this.apiUrl('users'), user).pipe(catchError(this.handleError));
    }
  }

  updateUser(user: User): Observable<User | undefined> {
    if (this.configService.useMockData) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users = [
          ...this.users.slice(0, index),
          user,
          ...this.users.slice(index + 1)
        ];
        return of(user);
      }
      return of(undefined);
    } else {
      return this.http.put<User>(this.apiUrl(`users/${user.id}`), user).pipe(catchError(this.handleError));
    }
  }

  deleteUser(id: number): Observable<boolean> {
    if (this.configService.useMockData) {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        this.users = [
          ...this.users.slice(0, index),
          ...this.users.slice(index + 1)
        ];
        return of(true);
      }
      return of(false);
    } else {
      return this.http.delete<boolean>(this.apiUrl(`users/${id}`)).pipe(catchError(this.handleError));
    }
  }

  private apiUrl(path: string): string {
    return `${this.configService.apiBaseUrl}/${path}`;
  }

  private generateUniqueId(): number {
    const lastId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
    return lastId + 1;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}

interface User {
  id: number;
  userId: string;
  userName: string;
  userRole: string;
  userEmail: string;
  description: string;
}
