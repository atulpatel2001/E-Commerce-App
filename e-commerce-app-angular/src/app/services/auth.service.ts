/**
 * in this service define authentication related api call ,like login and register
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:4000/api/v1/users';
  constructor(private http: HttpClient) {}

  /**
   * purpose of this function is register user and store a data in db ,call node js api
   * @param name
   * @param email
   * @param password
   * @param phone
   * @returns response.data
   */
  async loginUser(email: string, password: string): Promise<any> {
    try {
      const response = await this.http
        .post<any>(`${this.API_URL}/login`, { email, password })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * purpose of this function is authorize user and provide permission
   * @param email
   * @param password
   * @returns response.data.data
   */
  async register(
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<any> {
    try {
      const response = await this.http
        .post<any>(`${this.API_URL}/register`, { name, email, password, phone })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
