
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ApplicationService {
    private applications: Application[] = [
      { id: 1, applicationId: 'external-id-1', applicationName: 'Application 1', environment: 'Development', description: 'Description 1' },
      { id: 2, applicationId: 'external-id-2', applicationName: 'Application 2', environment: 'Production', description: 'Description 2' },
      // Add more mock data as needed
    ];
  
    constructor(private http: HttpClient, private configService: ConfigService) {}
  
    getApplications(): Observable<Application[]> {
      return this.configService.useMockData 
        ? of(this.applications) 
        : this.http.get<Application[]>(this.apiUrl('applications')).pipe(catchError(this.handleError));
    }
  
    getApplicationById(id: number): Observable<Application | undefined> {
      return this.configService.useMockData 
        ? of(this.applications.find((a) => a.id === id)) 
        : this.http.get<Application>(this.apiUrl(`applications/${id}`)).pipe(catchError(this.handleError));
    }
  
    createApplication(application: Application): Observable<Application> {
      if (this.configService.useMockData) {
        const newApplication = { ...application, id: this.generateUniqueId() };
        this.applications = [...this.applications, newApplication];
        return of(newApplication);
      } else {
        return this.http.post<Application>(this.apiUrl('applications'), application).pipe(catchError(this.handleError));
      }
    }
  
    updateApplication(application: Application): Observable<Application | undefined> {
      if (this.configService.useMockData) {
        const index = this.applications.findIndex((a) => a.id === application.id);
        if (index !== -1) {
          this.applications = [
            ...this.applications.slice(0, index),
            application,
            ...this.applications.slice(index + 1)
          ];
          return of(application);
        }
        return of(undefined);
      } else {
        return this.http.put<Application>(this.apiUrl(`applications/${application.id}`), application).pipe(catchError(this.handleError));
      }
    }
  
    deleteApplication(id: number): Observable<boolean> {
      if (this.configService.useMockData) {
        const index = this.applications.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.applications = [
            ...this.applications.slice(0, index),
            ...this.applications.slice(index + 1)
          ];
          return of(true);
        }
        return of(false);
      } else {
        return this.http.delete<boolean>(this.apiUrl(`applications/${id}`)).pipe(catchError(this.handleError));
      }
    }
  
    private apiUrl(path: string): string {
      return `${this.configService.apiBaseUrl}/${path}`;
    }
  
    private generateUniqueId(): number {
      const lastId = this.applications.length > 0 ? this.applications[this.applications.length - 1].id : 0;
      return lastId + 1;
    }
  
    private handleError(error: any) {
      console.error('An error occurred', error);
      return throwError(error);
    }
  }
  
  interface Application {
    id: number;
    applicationId: string;
    environment: string;
    applicationName: string;
    description: string;
    // Add other application properties as needed
  }
  