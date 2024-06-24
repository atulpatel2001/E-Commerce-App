import { Component } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent {
  cart: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  handleCheckout() {
    // const userId = 'exampleUserId';
    // this.cartService.saveCartToDatabase(userId).subscribe(response => {
    //   console.log('Cart saved to database:', response);
    //   this.cartService.clearCart();
    // });
  }

  increaseQuantity(item: Cart) {
    this.cartService.increaseQuantity(item.productId);
    this.cart = this.cartService.getCartFromLocalStorage(); 
  }

  decreaseQuantity(item: Cart) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item.productId);
     
    }
  }

  removeItem(productId: string) {
    this.cartService.removeItem(productId);
  }
}
