import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiBaseUrl = 'http://localhost:3000/api'; // Replace with your actual API base URL
  useMockData = true;
}
