import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CookieServices } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent {
  cart: Cart[] = [];
  total:number=0;
  token:string='';

  constructor(private cartService: CartService,private cookiesService:CookieServices,private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.cartService.getTotalAmount();
      this.token=this.cookiesService.getCookie();
    });

  }

  handleCheckout() {
    this.router.navigate(['/checkout']);
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
