import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    API_URL = 'http://localhost:4000/api/v1/users';
  constructor(private http: HttpClient) { }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.API_URL}/login`, { email, password }).toPromise();
      return response; 
    } catch (error) {
      throw error;
    }
  }

  async register(name:string, email:string, password:string,phone:string): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.API_URL}/register`, { name,email,password,phone }).toPromise();
      return response; 
    } catch (error) {
      throw error;
    }
  }
}