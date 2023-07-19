import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ConfigService } from './config.service';
import { sampleRestrictions } from '../models/messages';
import { Restriction } from '../models/message';

@Injectable({
    providedIn: 'root'
  })
export class RestrictionService {
  private restrictions: Restriction[] = sampleRestrictions;

  constructor(public http: HttpClient) {}

  getRestrictions(): Observable<Restriction[]> {
    return true
      ? of(this.restrictions) 
      : this.http.get<Restriction[]>(this.apiUrl('restrictions')).pipe(catchError(this.handleError));
  }

  getRestrictionsByMessageIdAndElementId(messageId: string, elementId: string): Observable<Restriction[]> {
    console.log(messageId, elementId)
    if (true) {
      return of(this.restrictions.filter((r) => r.messageId === messageId && r.elementId === elementId));
    } else {
      // This API endpoint needs to exist on your server
      return this.http.get<Restriction[]>(this.apiUrl(`restrictions?messageId=${messageId}&elementId=${elementId}`)).pipe(catchError(this.handleError));
    }
  }

  getCountByMessageId(messageId: string): Observable<number> {
    if (true) {
      return of(this.restrictions.filter((r) => r.messageId === messageId).length);
    } else {
      // This API endpoint needs to exist on your server
      return this.http.get<number>(this.apiUrl(`restrictions/count?messageId=${messageId}`)).pipe(catchError(this.handleError));
    }
  }

  getCountByMessageIdAndElementId(messageId: string, elementId: string): Observable<number> {
    if (true) {
      return of(this.restrictions.filter((r) => r.messageId === messageId && r.elementId === elementId).length);
    } else {
      // This API endpoint needs to exist on your server
      return this.http.get<number>(this.apiUrl(`restrictions/count?messageId=${messageId}`)).pipe(catchError(this.handleError));
    }
  }

  createRestriction(restriction: Restriction): Observable<Restriction> {
    if (true) {
      this.restrictions = [...this.restrictions, restriction];
      return of(restriction);
    } else {
      return this.http.post<Restriction>(this.apiUrl('restrictions'), restriction).pipe(catchError(this.handleError));
    }
  }

  updateRestriction(restriction: Restriction): Observable<Restriction> {
    if (true) {
      const index = this.restrictions.findIndex((r) => r.id === restriction.id);
      if (index !== -1) {
        this.restrictions = [
          ...this.restrictions.slice(0, index),
          restriction,
          ...this.restrictions.slice(index + 1)
        ];
        return of(restriction);
      }
      return of(undefined);
    } else {
      return this.http.put<Restriction>(this.apiUrl(`restrictions/${restriction.id}`), restriction).pipe(catchError(this.handleError));
    }
  }

  deleteRestriction(id: string): Observable<boolean> {
    if (true) {
      const index = this.restrictions.findIndex((r) => r.id === id);
      if (index !== -1) {
        this.restrictions = [
          ...this.restrictions.slice(0, index),
          ...this.restrictions.slice(index + 1)
        ];
        return of(true);
      }
      return of(false);
    } else {
      return this.http.delete<boolean>(this.apiUrl(`restrictions/${id}`)).pipe(catchError(this.handleError));
    }
  }


  

  private apiUrl(path: string): string {
    return `localhost:3000/${path}`;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}