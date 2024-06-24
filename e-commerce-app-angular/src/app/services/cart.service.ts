import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart.model'

const API_URL = 'http://localhost:4000/api/v1/cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  saveCartToDatabase(cartItems: Cart[]): Observable<any> {
    return this.http.post<any>(`${API_URL}/create`, { cartItems });
  }

  fetchCartFromDatabase(userId: string | null): Observable<any> {
    return this.http.get<any>(`${API_URL}/cart`);
  }
}
