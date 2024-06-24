/**
 * in this service define cart related api call ,like add to cart,change quantity
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart.model';

const API_URL = 'http://localhost:4000/api/v1/cart/';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  /**
   * save cart to database throw api calling
   * @param cartItems
   */
  saveCartToDatabase(cartItems: Cart[]): Observable<any> {
    return this.http.post<any>(`${API_URL}/create`, { cartItems });
  }

  /**
   * fetch cart data from database but related particular user
   * @param userId
   * @returns
   */
  fetchCartFromDatabase(userId: string | null): Observable<any> {
    return this.http.get<any>(`${API_URL}/cart`);
  }
}
