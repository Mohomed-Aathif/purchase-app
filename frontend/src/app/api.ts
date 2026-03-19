import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loginUrl = 'https://ez-staging-api.azurewebsites.net/api/External_Api/POS_Api/Invoke';

  private backendUrl = 'https://localhost:5001/api/location'; // CHANGE PORT

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.loginUrl, data);
  }

  saveLocations(data: any) {
    return this.http.post(`${this.backendUrl}/save`, data);
  }

  getLocations() {
    return this.http.get(`${this.backendUrl}/all`);
  }
}