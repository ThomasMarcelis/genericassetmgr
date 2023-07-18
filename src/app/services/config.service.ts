import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiBaseUrl = 'http://example.com/api'; // Replace with your actual API base URL
  useMockData = true;
}
