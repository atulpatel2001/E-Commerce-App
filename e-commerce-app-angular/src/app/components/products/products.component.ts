import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  product: Product[] = [];


  constructor(private productService: ProductService) {}
  loadProducts=()=>{
    this.productService.getAllProducts().subscribe(products => {
   // this.products=products.data;
    });
  }
  ngOnInit(): void {
  this.loadProducts();
  }
}
