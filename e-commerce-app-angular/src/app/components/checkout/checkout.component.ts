import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/services/cart.service';
import { CookieServices } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private router: Router,private cookiesService:CookieServices,private cartService:CartService,private tostService:NgToastService ) {}

  personalDetails = {
    fullName: '',
    email: '',
    address: ''
  };

  paymentMethod: string = '';
  creditCardDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  onSubmit() {
    this.cartService.clearCart();
    this.resetForm();
    this.tostService.success({
      detail: 'Success',
      summary: "Successfully Place Order!!!!!! ",
      duration: 3000
    })
    this.router.navigate(['products'])
  }

  resetForm() {
    this.personalDetails = {
      fullName: '',
      email: '',
      address: ''
    };
    this.paymentMethod = '';
    this.creditCardDetails = {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
  }
}
