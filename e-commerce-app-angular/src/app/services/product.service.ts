import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/product.model'; // Adjust the import based on your product model

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:4000/api/v1/products';

  constructor(private http: HttpClient) {}

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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${productId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return throwError(error);
      })
    );
  }
}
