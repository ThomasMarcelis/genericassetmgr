import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Restriction } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ExampleValueService {
      private examples : Restriction[] = [
        new Restriction(
          `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>`, // ID
          'com.eoc.stpcom.005.01', // messageId
          `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>`, // elementId
          'Antwerp' // rule
        ),
        new Restriction(
          `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>`, // ID
          'com.eoc.stpcom.005.01', // messageId
          `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>`, // elementId
          '0' // rule
        ),
      ];

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getExamples(): Observable<Restriction[]> {
    return this.configService.useMockData 
      ? of(this.examples) 
      : this.http.get<Restriction[]>(this.apiUrl('examples')).pipe(catchError(this.handleError));
  }

  getExampleById(id: string): Observable<Restriction | undefined> {
    return this.configService.useMockData 
      ? of(this.examples.find((r) => r.id === id)) 
      : this.http.get<Restriction>(this.apiUrl(`examples/${id}`)).pipe(catchError(this.handleError));
  }

  createExample(example: Restriction): Observable<Restriction> {
    if (this.configService.useMockData) {
      this.examples = [...this.examples, example];
      return of(example);
    } else {
      return this.http.post<Restriction>(this.apiUrl('examples'), example).pipe(catchError(this.handleError));
    }
  }

  getExamplesByMessageId(messageId: string): Observable<Restriction[]> {
    if (this.configService.useMockData) {
      const examplesForMessageId = this.examples.filter((example) => example.messageId === messageId);
      console.log("example messages: ", examplesForMessageId)
      return of(examplesForMessageId);
    } else {
      return this.http.get<Restriction[]>(this.apiUrl(`examples/message/${messageId}`)).pipe(catchError(this.handleError));
    }
  }

  updateExample(example: Restriction): Observable<Restriction | undefined> {
    if (this.configService.useMockData) {
      const index = this.examples.findIndex((r) => r.id === example.id);
      if (index !== -1) {
        this.examples = [
          ...this.examples.slice(0, index),
          example,
          ...this.examples.slice(index + 1)
        ];
        return of(example);
      }
      return of(undefined);
    } else {
      return this.http.put<Restriction>(this.apiUrl(`examples/${example.id}`), example).pipe(catchError(this.handleError));
    }
  }

  deleteExample(id: string): Observable<boolean> {
    if (this.configService.useMockData) {
      const index = this.examples.findIndex((r) => r.id === id);
      if (index !== -1) {
        this.examples = [
          ...this.examples.slice(0, index),
          ...this.examples.slice(index + 1)
        ];
        return of(true);
      }
      return of(false);
    } else {
      return this.http.delete<boolean>(this.apiUrl(`examples/${id}`)).pipe(catchError(this.handleError));
    }
  }

  private apiUrl(path: string): string {
    return `${this.configService.apiBaseUrl}/${path}`;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
