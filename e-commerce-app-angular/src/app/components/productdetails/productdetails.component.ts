import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService,
    private tostService: NgToastService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((product:any) => {
          this.product = product.data;
        });
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItemToCart(product);
    this.tostService.success( {
      detail: 'Success',
      summary: "Successfully Add Product to cart",
      duration: 3000
    })
  }
}
