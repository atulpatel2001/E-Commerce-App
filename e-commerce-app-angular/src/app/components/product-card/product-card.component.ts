import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!:Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addItemToCart(this.product);
  }
}
