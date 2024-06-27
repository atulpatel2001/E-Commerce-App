import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}
  loadProducts=()=>{
    this.productService.getAllProducts().subscribe((elements:any) => {
       console.log(elements.data);
       this.products=elements.data;
    });
  }
  ngOnInit(): void {
  this.loadProducts();

  }
}
