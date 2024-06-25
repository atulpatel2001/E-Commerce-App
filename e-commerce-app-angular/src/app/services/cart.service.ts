import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private apiUrl = 'http://localhost:4000/cart';
  private cartSubject = new BehaviorSubject<Cart[]>(this.getCartFromLocalStorage());
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  addItemToCart(product: Product) {
    const currentCart = this.getCartFromLocalStorage();
    const existingItem = currentCart.find(item => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      let newCart:Cart={
          productId: product._id,
          productName: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
      }
      currentCart.push(newCart);
    }

    this.saveCartToLocalStorage(currentCart);
    this.cartSubject.next(currentCart);
  }

  getCartFromLocalStorage(): Cart[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCartToLocalStorage(cart: Cart[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next([]);
  }

  saveCartToDatabase(userId: string) {
    const currentCart = this.getCartFromLocalStorage();

    return this.http.post(`${this.apiUrl}/create`, { items: currentCart }, { withCredentials: true });
  }


  increaseQuantity(productId: string) {
    const currentCart = this.getCartFromLocalStorage();
    const item = currentCart.find(item => item.productId === productId);
    if (item) {
      item.quantity += 1;
      item.price=item.price * item.quantity;
      this.saveCartToLocalStorage(currentCart);
      this.cartSubject.next(currentCart);
    }
  }

  decreaseQuantity(productId: string) {
    const currentCart = this.getCartFromLocalStorage();
    const item = currentCart.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      //item.price = item.price * item.quantity;
      this.saveCartToLocalStorage(currentCart);
      this.cartSubject.next(currentCart);

    }
  }

  removeItem(productId: string) {
    let currentCart = this.getCartFromLocalStorage();
    currentCart = currentCart.filter(item => item.productId !== productId);
    this.saveCartToLocalStorage(currentCart);
    this.cartSubject.next(currentCart);
  }


}
