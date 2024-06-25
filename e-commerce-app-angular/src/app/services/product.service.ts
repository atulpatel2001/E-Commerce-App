/**
 * Product service class fetch product from db or add product in db
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:4000/products';

  constructor(private http: HttpClient) {}

  /**
   * create a product and store in databse
   * @param formData
   * @returns api response
   */
  createProduct(formData: FormData): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http
      .post<Product>(`${this.API_URL}/create`, formData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error creating product:', error);
          return throwError(error);
        })
      );
  }

  /**
   * getall product from database
   * @returns Product[]
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Fetch Product By Id
   * @param productId
   * @returns Product
   */
  getProductById(productId: string): Observable<Product> {
    console.log(`${this.API_URL}/${productId}`)
    return this.http.get<Product>(`${this.API_URL}/${productId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return throwError(error);
      })
    );
  }
}
